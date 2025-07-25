import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Query,
  Request,
  UnauthorizedException,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { SignupDto } from '../dto/signup.dto';
import { LoginDto } from '../dto/login.dto';
import { ResponseUtil } from 'src/common/utils/response.utils';
import { ForgetPasswordDto } from '../dto/forget.dto';
import { AuthGuard } from '@nestjs/passport';


@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {
  }

  @Post('signup')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async signup(@Body() dto: SignupDto) {
    const result = await this.userService.signup(dto);
    return ResponseUtil.success('Signup successful. Please verify your email.', result);
  }

  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async login(@Body() dto: LoginDto) {
    const result = await this.userService.login(dto);
    return ResponseUtil.success('Login successful', result);
  }

  @Get('verify')
  async verify(@Query('token') token: string) {
    const result = await this.userService.verifyEmail(token);
    return ResponseUtil.success('Email verified successfully!', result);
  }

  @Get('send-forget-email/:email')
  async sendForgetEmail(@Param('email') email: string) {
    const result = await this.userService.sendForgetEmailToUser(email)
    return ResponseUtil.success('Successfully Send Password Reset Email to user', result)
  }

  @Post('forget-password/:token')
  async forgetPassword(@Param('token') token: string, @Body() dto: ForgetPasswordDto) {
    const result = this.userService.forgetPassword(token, dto)
    return ResponseUtil.success('Reset Password Successfully', result)
  }

  // @Get("sendotp-bymobile/:phone/:email")
  // async sendOtpToUserByMobile(@Param('phone') phone:string,@Param('email') email:string){
  //     return this.userService.twoStepVerificationByMobile(phone,email)

  // }

  @Get("sendotp-byemail/:email")
  async sendOtpToUserByEmail(@Param('email') email: string) {
    return this.userService.twoStepVerificationByEmail(email)

  }

  @Get("verifyotp-byemail/:code/:email")
  verifyOtp(@Param('code') code: string, @Param('email') email: string) {
    return this.userService.verifiedOtp(email, code)
  }


  @UseGuards(AuthGuard('jwt'))
  @Post('/valid')
  async getProfile(@Request() req, @Body() users: any) {
    console.log("dummy")
    await this.userService.signupWithAuth0(req.user)
    .catch(err => { throw new UnauthorizedException() })
    const result = await this.userService.updateUser(users)
    return ResponseUtil.success("Sigin successfully ",result)

  }

  @Get('all')
  getAllHeaders() {
    console.log("success")
    return "success"
  }

}
