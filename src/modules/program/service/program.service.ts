import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Prisma } from "@prisma/client";

import { PrismaService } from "src/common/prisma/prisma.service";

@Injectable()
export class ProgramService {

    constructor(private prisma: PrismaService) { }

    async createPrograms(data: Prisma.ProgramCreateInput) {
        const getProgram = await this.prisma.program.findUnique({ where: { name: data.name } })
        if (getProgram) {
            return getProgram;
        }
        return await this.prisma.program.create({ data })
    }

    async getPrograms(name:string){
        return await this.prisma.program.findUnique({where:{name}})
    }

    async updatePrograms(data:Prisma.ProgramUpdateInput,name:string){
        const getProgram =await this.prisma.program.findUnique({ where: { name } })
        if (!getProgram) {
            throw new UnauthorizedException("product not found")
        }
        return await this.prisma.program.update({where:{id:getProgram.id},data})
    }

    async deleteProgram(name:string){
        const getProgram =await this.prisma.program.findUnique({ where: { name } })
        if (!getProgram) {
            return "product not found"
        }
        return await this.prisma.program.delete({where:{name}})
    } 


}