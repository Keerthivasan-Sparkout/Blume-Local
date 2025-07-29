import { Injectable } from "@nestjs/common";
import {Prisma} from "@prisma/client"
import { PrismaService } from "src/common/prisma/prisma.service";

@Injectable()
export class TaskServices{

    constructor(private prisma:PrismaService){}

    async createTask(data:Prisma.TaskCreateInput){
        return await this.prisma.task.create({data})
       
    }


}