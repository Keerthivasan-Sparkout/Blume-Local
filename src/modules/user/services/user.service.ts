import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Prisma } from '@prisma/client';



@Injectable()
export class UserService {

  constructor(  private prisma: PrismaService) {}

  async signupWithAuth0(accessKey: any) {

    const getUser = await this.prisma.userauth.findUnique({ where: { sub: accessKey.sub } })

    if (getUser) {
      return getUser
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


