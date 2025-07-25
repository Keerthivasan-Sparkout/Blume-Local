import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../dto/login.dto';
import { MailSenderService } from '../../mail/mail-sender.service';
import { User } from '../entities/user.entity';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { ForgetPasswordDto } from '../dto/forget.dto';


@Injectable()
export class UserService {

  // private twilioService:Twilio
  // this.twilioService=new Twilio(process.env.TWILIO_ACCOUNT_SID,process.env.TWILIO_AUTH_TOKEN)
  constructor(
    private readonly jwtService: JwtService,
    private readonly mailSender: MailSenderService,
    private prisma: PrismaService,
  ) {
  }

  async signup(dto: Prisma.UserCreateInput) {
    const existing = await this.prisma.user.findUnique({ where: { email: dto.email } })
    if (existing) throw new Error('User already exists');
    const password = await bcrypt.hash(dto.password, 10)
    const user: User = {
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      mobile: dto.mobile,
      password
    }
    await this.prisma.user.create({ data: user })
    const token = await this.jwtService.signAsync({ email: user.email }, { expiresIn: '24h' });
    await this.mailSender.sendEmail(user.email, "subject", 'signup', { name: user.firstName, });
    return { message: 'Signup successful. Please verify your email.' };
  }

  async login(dto: LoginDto) {
    const user = await this.findByEmail(dto.email);
    console.log(user)
    console.log((await bcrypt.compare(dto.password, user?.password)))
    if (!user || !(await bcrypt.compare(dto.password, user.password)))
      throw new UnauthorizedException('Invalid credentials');


    // if (user.isVerified) throw new UnauthorizedException('Email is not verified');

    const token = await this.jwtService.signAsync({ email: user.email, sub: user.mobile });
    const returndata = {
      firstName: user.firstName,
      lastName: user.lastName, email: user.email, mobile: user.mobile
    }
    return { access_token: token, returndata };
  }

  async verifyEmail(token: string) {
    const payload = await this.jwtService.verifyAsync(token);
    const user = await this.findByEmail(payload.email);
    if (user) {
      // user.isVerified = true;
      return { message: 'Email verified successfully' };
    }
    throw new UnauthorizedException('Invalid token');
  }

  private async findByEmail(email: string): Promise<User | undefined> {
    const getUser = await this.prisma.user.findUnique({ where: { email } });
    if (!getUser) {
      throw new UnauthorizedException("User not found")
    }
    return getUser
  }

  async forgetPassword(token: string, dto: ForgetPasswordDto) {
    const verified = await this.jwtService.verifyAsync(token)
    const getUser = await this.findByEmail(verified.sub)
    if (!getUser) {
      throw new UnauthorizedException("User not found")
    }
    getUser.password = await bcrypt.hash(dto.password, 10)
    await this.prisma.user.update({ where: { email: getUser.email }, data: getUser })
  }

  async sendForgetEmailToUser(email: string) {
    const getUser = await this.findByEmail(email)
    if (!getUser) {
      throw new UnauthorizedException("User not found")
    }

    const jwt_token = await this.jwtService.signAsync({ sub: getUser.email });
    const resetLink = `https://localhost/reset-password?token=${jwt_token}`
    const userObj = { name: getUser?.firstName, email: getUser?.email }
    await this.mailSender.sendEmail(email, "Reset password Link", 'link_reset_password', { reset: resetLink })
    return { resetLink, userObj }
  }



  // async twoStepVerificationByMobile(mobile:string,email:string){
  //     const getUser=await this.prisma.user.findUnique({where:{email}})
  //     if(!getUser){
  //       return
  //     }
  //     getUser.mobileOtp=this.generateOtp()
  //     await this.prisma.user.update({ where: { email: getUser.email }, data: getUser }) 
  //     const serviceId=process.env.TWILIO_VERIFICATION_SERVICE_SID as string
  //     // await this.twilioService.verify.services(serviceId).verifications.create({})
  //     // await this.twilioService.messages.create({
  //     //   body: '',
  //     //   to: ''
  //     // })
  // }

  async twoStepVerificationByEmail(email: string) {
    const getUser = await this.prisma.user.findUnique({ where: { email } })
    if (!getUser) {
      return
    }
    getUser.emailOtp = this.generateOtp()
    await this.prisma.user.update({ where: { email: getUser.email }, data: getUser })
    await this.mailSender.sendEmail(getUser.email, "Verification code", 'send_otp', { otp: getUser.emailOtp })
  }

  generateOtp() {
    return Math.floor(Math.random() * ((999999 - 100000) + 1)) + 100000
  }

  async verifiedOtp(email: string, code: string) {
    const getUser = await this.prisma.user.findUnique({ where: { email } })
    if (!getUser) {
      throw new UnauthorizedException("User not found")
    }
    if (getUser?.emailOtp === parseInt(code)) {
      return "done"
    }
  }

  async sendLogInOtpToUser(email: string) {
    const existing = await this.prisma.user.findUnique({ where: { email } })
    if (existing) {
      await this.twoStepVerificationByEmail(email)
    }
  }


  async signupWithAuth0(accessKey: any) {

    const getUser = await this.prisma.userauth.findUnique({ where: { sub: accessKey.sub } })

    if (getUser) {
      console.log("alreday exited")
      throw new UnauthorizedException("Email is already exits")
    }

    let newUser: Prisma.UserauthCreateInput
    if (!getUser && accessKey.sub.startsWith('apple')) {
      newUser = {
        sub: accessKey.sub,
        appleToken: accessKey.sub
      }
    }
    else {//if (!getUser && accessKey.sub.startsWith('google-oauth2')) {
      newUser = {
        sub: accessKey.sub,
        googleToken: accessKey.sub
      }
    }
    await this.prisma.userauth.create({ data: newUser })
  }

  async updateUser(user: any) {
    const getUser = await this.prisma.userauth.findUnique({ where: { sub: user.sub } })

    if (!getUser) {
      return "user not found"
    }
    let update_User: Prisma.UserauthUpdateInput
    if (user.sub.startsWith('apple')) {
      update_User = this.createAppleUser(user)
    }
    else { // if (user.sub.startsWith('google-oauth2')) {
      update_User = this.createGoogleUser(user)
    }
    return await this.prisma.userauth.update({ where: { sub: user.sub }, data: update_User })

  }

  createAppleUser(user: any) {
    return {
      firstName: user.name,
      sub: user.sub,
      email:user?.email,
      appleToken: user.sub
    }
  }

  createGoogleUser(user: any) {
   
    return {
      firstName: user.given_name,
      lastName: user.family_name,
      sub: user.sub,
      email: user.email,
      googleToken: user.sub
    }
  }

  async signupWithemail(user: any) {

    // const getUser = await this.prisma.userauth.findFirst({ where: { OR: [
    //   { googleToken: accessKey.sub },
    //   { appleToken: accessKey.sub }
    // ] }})

    const getUser = await this.prisma.userauth.findUnique({ where: { sub: user.sub } })
    if (getUser) {
      return getUser + "already exits"
    }

    let newUser: Prisma.UserauthCreateInput
    if (user.email.endsWith('@gmail.com')) {
      newUser=this.createGoogleUserA(user)
    }
    if (user.email.endsWith('@privaterelay.appleid.com') || user.email.endsWith('@appleid.com')) {
      newUser=this.createAppleUser(user)
    }

    return await this.prisma.userauth.create
  }

  createGoogleUserA(user: any) {
    let token: string = ''
    if (user.sub.startsWith('apple')) {
      token = user.sub
    }
    return {
      firstName: user.given_name,
      lastName: user.family_name,
      sub: user.sub,
      email: user.email,
      googleToken: (token === '') ? user.sub : null,
      appleToken: token ? token : null
    }
  }

  async dummy(email,sub){
   const exited= await this.prisma.userauth.findUnique({where:{email}})
    if(exited){
      (!exited.appleToken && sub.startsWith('apple'))?exited.appleToken=sub:null;
      (!exited.googleToken && sub.startsWith('google'))?exited.googleToken=sub:null;
    }else{
        //call create method
    }
    
  }
}


