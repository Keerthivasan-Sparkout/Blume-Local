import { Injectable, UnauthorizedException } from "@nestjs/common";
import {Prisma} from "@prisma/client"
import { PrismaService } from "src/common/prisma/prisma.service";

@Injectable()
export class TaskServices{

    constructor(private prisma:PrismaService){}

    async createTask(task:Prisma.TaskCreateInput,email:string){
        const getUser=await this.prisma.user.findUnique({where:{email}})
        if(!getUser){
            throw new UnauthorizedException("user not found")
        }
        // const getTask=await this.prisma.task.findFirst({where:{type:getUser.id}})
        // if(getTask){
        //     return getTask
        // }
        return await this.prisma.task.create({data:{...task,user:{connect:{id:getUser.id}}}})
    }

    async getTaskAllTask(email:string){
        const getUser=await this.prisma.user.findUnique({where:{email},include:{task:true}})
         if(!getUser){
            throw new UnauthorizedException("user not found")
        }
        return getUser
    }

    async updateTaskByUser(email:string){
        const getUser = await this.prisma.user.findUnique({where:{email}})
        if(!getUser){
            throw new UnauthorizedException("user not found")
        }
        return await this.prisma.task.findMany({where:{userId:getUser.id}})
    }
}