import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/common/prisma/prisma.service";

@Injectable()
export class AdddressServices{


    constructor(private prisma:PrismaService){}

    async addAddressToUser(address:Prisma.AddressCreateInput,sub:string){
    const getUser=await this.prisma.user.findUnique({where:{sub}})
    if (!getUser) {
      return "user not found"
    }
      return await this.prisma.address.create({data:{...address,user:{connect:{id:getUser.id}}}})
  }

  async fetchAddress(typeAddress:string,sub:string){
    const getUser=await this.prisma.user.findUnique({where:{sub}})
    if (!getUser) {
      return "user not found"
    }
    if(typeAddress==='BILLING' || typeAddress==='DELIVERY'){
     return await this.prisma.address.findMany({where:{userId:getUser.id,addresType:typeAddress}})
    }
   return "Address doesn't exits"
  }

  async deleteAddress(id:number){
    return await this.prisma.address.delete({where:{id}})
  }
}