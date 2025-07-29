import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { User } from '../entities/user.entity';
import { UserCartDto } from '../dto/user.cart.update.dto';
import { UserUpdateDto } from '../dto/upadate.user.dto';
import { connect } from 'http2';



@Injectable()
export class UserService {

  constructor(private prisma: PrismaService) { }

  async signupWithAuth0(accessKey: any) {

    const getUser = await this.prisma.user.findUnique({ where: { sub: accessKey.sub } })

    if (getUser) {
      return getUser
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
    await this.prisma.user.create({ data: newUser })
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
    return await this.prisma.user.update({ where: { sub: user.sub }, data: update_User })

  }

  async updateUser(user:Prisma.UserUpdateInput,email:string){
    const getUser = await this.prisma.user.findUnique({ where: { email } })
    if (!getUser) {
      return "user not found"
    }

    return await this.prisma.user.update({where:{id:getUser.id},data:user})
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

  async addProgramToUserCart(email, name) {
    let getUser: User
    let getProgram: Prisma.ProgramWhereUniqueInput
    const [user, program] = await Promise.all([this.prisma.user.findUnique({ where: { email } }),
    this.prisma.program.findUnique({ where: { name } })
    ])
    if (!user || !program) {
      throw new UnauthorizedException("Invalid credential")
    }
    getUser = user
    getProgram = program
    return await this.prisma.userProgram.create({
      data:{user:{connect:{id:getUser.id}},
    program:{connect:{id:getProgram.id}}},include:{user:true,program:true}
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

  // async signupWithemail(user: any) {

  //   // const getUser = await this.prisma.userauth.findFirst({ where: { OR: [
  //   //   { googleToken: accessKey.sub },
  //   //   { appleToken: accessKey.sub }
  //   // ] }})

  //   const getUser = await this.prisma.userauth.findUnique({ where: { sub: user.sub } })
  //   if (getUser) {
  //     return getUser + "already exits"
  //   }

  //   let newUser: Prisma.UserauthCreateInput
  //   if (user.email.endsWith('@gmail.com')) {
  //     newUser=this.createGoogleUserA(user)
  //   }
  //   if (user.email.endsWith('@privaterelay.appleid.com') || user.email.endsWith('@appleid.com')) {
  //     newUser=this.createAppleUser(user)
  //   }

  //   return await this.prisma.userauth.create
  // }


}


