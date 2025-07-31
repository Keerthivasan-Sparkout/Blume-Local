import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/common/prisma/prisma.service";

@Injectable()
export class OrderServices {

    constructor(private prisma: PrismaService) { }

    async createOrder(order: Prisma.OrderCreateInput, email: string) {
        const getUser = await this.prisma.user.findUnique({ where: { email } })
        if (!getUser) {
            throw new UnauthorizedException("user not found")
        }
        return await this.prisma.order.create({data:{...order,user:{connect:{id:getUser.id}}}})
    }

    async fetchAllOrderByUser(sub:string){
        const getUser = await this.prisma.user.findUnique({ where: { sub } })
        if (!getUser) {
            throw new UnauthorizedException("user not found")
        }
        const result = await this.prisma.order.findMany({where:{userId:getUser.id}})
        return result?result:null;
    }

    async updateOrderStatus(orderId:number,currentStatus){
        const getOrder=await this.prisma.order.findUnique({where:{id:orderId}})
         if (!getOrder) {
            throw new UnauthorizedException("user not found")
        }
        return await this.prisma.order.update({where:{id:orderId},data:{status:currentStatus}})
    }
}