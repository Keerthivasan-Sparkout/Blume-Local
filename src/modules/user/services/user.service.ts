import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { User } from '../entities/user.entity';
import { UserUpdateDto } from '../dto/upadate.user.dto';


@Injectable()
export class UserService {

  constructor(private prisma: PrismaService) { }

  async signupWithAuth0(accessKey: any) {

    const getUser = await this.prisma.user.findUnique({ where: { sub: accessKey.sub } })

    if (getUser) {
      return {isCheck:'exited',data:getUser}
    }

    let newUser: Prisma.UserCreateInput
    if (!getUser && accessKey.sub.startsWith('apple')) {
      newUser = {
        sub: accessKey.sub,
        appleToken: accessKey.sub
      }
    }
    else if (!getUser && accessKey.sub.startsWith('google-oauth2')) {
      newUser = {
        sub: accessKey.sub,
        googleToken: accessKey.sub
      }
    } else {
      newUser = {
        sub: accessKey.sub,
        emailToken: accessKey.sub
      }
    }
    const result=await this.prisma.user.create({ data: newUser })
    return {isCheck:'new',data:result}
  }

  async updateUserWithId(user: any) {
    const getUser = await this.prisma.user.findUnique({ where: { sub: user.sub } })

    if (!getUser) {
      return "user not found"
    }
    let update_User: Prisma.UserUpdateInput
    if (user.sub.startsWith('apple')) {
      update_User = this.createAppleUser(user)
    }
    else { // if (user.sub.startsWith('google-oauth2')) {
      update_User = this.createGoogleUser(user)
    }
    const result = await this.prisma.user.update({ where: { sub: user.sub }, data: update_User }).catch(err=>{throw new Error()})
    console.log("finish")
    return result
  }

  async getProfile(sub:string){
    return await this.prisma.user.findUnique({where:{sub}})
  }

  async updateUser(user:UserUpdateDto, sub: string) {
    const getUser = await this.prisma.user.findUnique({ where: { sub } })
    if (!getUser) {
      return "user not found"
    }
    getUser.fullName=user.fullName
    getUser.gender=user.gender
    getUser.DoB=user.DoB
    getUser.mobile=user.mobile.toString()
    return await this.prisma.user.update({ where: { id: getUser.id }, data: getUser })
  }

  createAppleUser(user: any) {
    return {
      firstName: user.name,
      sub: user.sub,
      email: user.email,
      appleToken: user.sub
    }
  }

  createGoogleUser(user: any) {
    let token: string = ''
    if (user.sub.startsWith('email')) {
      token = user.sub
    }
    return {
      firstName: user.given_name,
      lastName: user.family_name,
      sub: user.sub,
      email: user.email,
      googleToken: (token === '') ? user.sub : null,
      emailToken: token ? token : null
    }
  }

  async changeEmail(sub:string,email:string){
    const getUser = await this.prisma.user.findUnique({ where: { sub } })
    if (!getUser) {
      return "user not found"
    }
    getUser.email=email
    return await this.prisma.user.update({where:{id:getUser.id},data:getUser})
  }

  async addProductToUserCart(email, name) {
    let getUser: User
    let getProduct: Prisma.ProductWhereUniqueInput
    const [user, product] = await Promise.all([this.prisma.user.findUnique({ where: { email } }),
    this.prisma.product.findUnique({ where: { name } })
    ])
    if (!user || !product) {
      throw new UnauthorizedException("Invalid credential")
    }
    getUser = user
    getProduct = product
    return await this.prisma.user.update({
      where: { id: getUser.id },
      data: {
        ...getUser,
        productCart: {
          connect: {
            id: getProduct.id
          }
        },
      }
    });
  }

  async addProgramToUserCart(sub, name) {
    let getUser: User
    let getProgram: Prisma.ProgramWhereUniqueInput
    const [user, program] = await Promise.all([this.prisma.user.findUnique({ where: { sub } }),
    this.prisma.program.findUnique({ where: { name } })
    ])
    if (!user || !program) {
      throw new UnauthorizedException("Invalid credential")
    }
    getUser = user
    getProgram = program
    let total = getProgram.totalDuration ?? 0;
    (typeof total === 'number') ? total = total * 7 : total = 0
    let renew = new Date()
    renew.setDate(renew.getDate() + (total))
    return await this.prisma.userProgram.create({
      data: {
        user: { connect: { id: getUser.id } },
        program: { connect: { id: getProgram.id } }, startAt: new Date(), renewAt: renew
      }, include: { user: true, program: true }
    });
  }

  async addServiceToUserCart(email, name) {
    let getUser: User
    let getService: Prisma.ServicesWhereUniqueInput
    const [user, service] = await Promise.all([this.prisma.user.findUnique({ where: { email } }),
    this.prisma.services.findUnique({ where: { name } })
    ])
    if (!user || !service) {
      throw new UnauthorizedException("Invalid credential")
    }
    getUser = user
    getService = service
    return await this.prisma.user.update({
      where: { id: getUser.id },
      data: {
        ...getUser,
        servicesCart: {
          connect: {
            id: getService.id
          }
        },

      }
    });
  }

  async activeProgramByUser(sub: string) {
    const getUser = await this.prisma.user.findUnique({ where: { sub } })
    if (!getUser) {
      return "user not found"
    }
    const allprogram = await this.prisma.userProgram.findMany({ where: { userId: getUser.id }, include: { user: true, program: true } })
    let activeProgram = allprogram.filter(program => {
      if (program.renewAt && program.startAt) {
        const diff = program.renewAt.getTime() - program.startAt.getTime();
        return diff > 0; 
      }
      return false; 
    });

    return activeProgram
  }

  async completedProgram(sub:string){
     const getUser = await this.prisma.user.findUnique({ where: { sub } })
    if (!getUser) {
      return "user not found"
    }
    const allprogram = await this.prisma.userProgram.findMany({ where: { userId: getUser.id }, include: { user: true, program: true } })
    let completedProgram = allprogram.filter(program => {
      if (program.renewAt && program.startAt) {
        const diff = program.renewAt.getTime() - program.startAt.getTime();
        return diff <= 0; 
      }
      return false; 
    });

    return completedProgram
  }


}


