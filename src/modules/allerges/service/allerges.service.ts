import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/common/prisma/prisma.service";
import { CreateAllergesDto } from "../dto/create.allerges.dto";



@Injectable()
export class AllergesService {

    constructor(private prisma: PrismaService) { }

    async createAllerges(sub: string, allerge: CreateAllergesDto) {
        const getUser = await this.prisma.user.findUnique({ where: { sub:"apple|001869.d6b0112f00d44146af0f33b32a9abae8.0857" } })
        if (!getUser) {
            return "no"
        }
        const getMedical = await this.prisma.medicalInfo.findUnique({ where: { userId: getUser.id } })
        if (!getMedical) {
            return ""
        }
        let isCreated=false
        let getAllerge
        getAllerge=await this.prisma.allerges.findUnique({where:{medicalInfoId:getMedical.id}})
        getAllerge?isCreated=true:false;
        if(!getAllerge && getUser && getMedical){
           getAllerge= await this.prisma.allerges.create({ data:{medicalInfo:{connect:{id:getMedical.id}}} })
            .then(obj=>{isCreated=true})
        }

        
        if(isCreated ){
            switch(allerge.id){
            case 1:
             return await this.prisma.allerges.update({where:{id:getAllerge.id},data:{peanutAllerge:{description:allerge.description,reactions:allerge.reactions,status:allerge.status,severity:allerge.severity}}})

             case 2:
             return await this.prisma.allerges.update({where:{id:getAllerge.id},data:{dustAllerge:{description:allerge.description,reactions:allerge.reactions,status:allerge.status,severity:allerge.severity}}})

             case 3:
             return await this.prisma.allerges.update({where:{id:getAllerge.id},data:{pollenAllerge:{description:allerge.description,reactions:allerge.reactions,status:allerge.status,severity:allerge.severity}}})

             case 4:
             return await this.prisma.allerges.update({where:{id:getAllerge.id},data:{petDanderAllerge:{description:allerge.description,reactions:allerge.reactions,status:allerge.status,severity:allerge.severity}}})

             case 5:
             return await this.prisma.allerges.update({where:{id:getAllerge.id},data:{soyAllerge:{description:allerge.description,reactions:allerge.reactions,status:allerge.status,severity:allerge.severity}}})

             default:
                throw new UnauthorizedException("Choice Valid Allerge")

        }
        }
        throw new UnauthorizedException("Invalid credentails")
    }


    async readAllerges(sub:string){
        const getUser = await this.prisma.user.findUnique({ where:{sub} })
        if (!getUser) {
            return ""
        }
        const getMedical = await this.prisma.medicalInfo.findUnique({ where: { userId: getUser.id } })
        if (!getMedical) {
            return ""
        }
        return await this.prisma.allerges.findUnique({where:{medicalInfoId:getMedical.id}})
    }

    async deleteAllerges(sub:string,allerge:CreateAllergesDto){
         const getUser = await this.prisma.user.findUnique({ where: {sub} })
        if (!getUser) {
            return ""
        }
        const getMedical = await this.prisma.medicalInfo.findUnique({ where: { userId: getUser.id } })
        if (!getMedical) {
            return ""
        }
        
        const getAllerge=await this.prisma.allerges.findUnique({where:{medicalInfoId:getMedical.id}})
        if(!getAllerge){
            return ""
        }
        
       
            switch(allerge.id){
            case 1:
             return await this.prisma.allerges.update({where:{id:getAllerge.id},data:{peanutAllerge:{}}})

             case 2:
             return await this.prisma.allerges.update({where:{id:getAllerge.id},data:{dustAllerge:{}}})

             case 3:
             return await this.prisma.allerges.update({where:{id:getAllerge.id},data:{pollenAllerge:{}}})

             case 4:
             return await this.prisma.allerges.update({where:{id:getAllerge.id},data:{petDanderAllerge:{}}})

             case 5:
             return await this.prisma.allerges.update({where:{id:getAllerge.id},data:{soyAllerge:{}}})

             default:
                throw new UnauthorizedException("Choice Valid Allerge")

        }

    }
}