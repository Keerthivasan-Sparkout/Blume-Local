import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/common/prisma/prisma.service";
import { CreateCurrentMedicanDto } from "../dto/create.currentMedican.dto";

@Injectable()
export class CurrentMedicanServices{

    constructor(private prisma:PrismaService){}

    async creatCurrentMedican(sub:string, medican:CreateCurrentMedicanDto) {
            const getUser = await this.prisma.user.findUnique({ where: { sub } })
            if (!getUser) {
                return "no"
            }
            let isExited=false
            let getMedican
            console.log(getUser)
            getMedican=await this.prisma.currentMedication.findUnique({where:{userId:getUser.id}})
            getMedican?isExited=true:false;
            if(!getMedican && getUser){
               getMedican= await this.prisma.currentMedication.create({ data:{user:{connect:{id:getUser.id}}} })
                .then(obj=>{isExited=true})
            }
            
            if(isExited ){
                switch(medican.id){
                case 1:
                 return await this.prisma.currentMedication.update({where:{id:getMedican.id},data:{metformin:{description:medican.description,frequency:medican.frequency}}})
    
                 case 2:
                 return await this.prisma.currentMedication.update({where:{id:getMedican.id},data:{atorvastalin:{description:medican.description,frequency:medican.frequency}}})
    
                 case 3:
                 return await this.prisma.currentMedication.update({where:{id:getMedican.id},data:{lisinopril:{description:medican.description,frequency:medican.frequency}}})
    
                 case 4:
                 return await this.prisma.currentMedication.update({where:{id:getMedican.id},data:{albuterolInhaler:{description:medican.description,frequency:medican.frequency}}})
    
                 case 5:
                 return await this.prisma.currentMedication.update({where:{id:getMedican.id},data:{levothyroxine:{description:medican.description,frequency:medican.frequency}}})
    
                 default:
                    throw new UnauthorizedException("Choice Valid Medican")
    
            }
            }
            throw new UnauthorizedException("Invalid credentails")
        }
    
    async fetchCurrentMedican(sub:string){
         const getUser = await this.prisma.user.findUnique({ where: { sub } })
            if (!getUser) {
                return "no"
            }
            const getMedican=await this.prisma.currentMedication.findUnique({where:{userId:getUser.id}})
            if(!getMedican){
                return ""
            }
            return getMedican
    }

    async deleteCurrentMedican(sub:string,medican:CreateCurrentMedicanDto){
         const getUser = await this.prisma.user.findUnique({ where: { sub } })
    if (!getUser) {
      return ""
    }
    const getMedican = await this.prisma.currentMedication.findUnique({ where: { userId: getUser.id } })
    if (!getMedican) {
      return ""
    }

   switch(medican.id){
                case 1:
                 return await this.prisma.currentMedication.update({where:{id:getMedican.id},data:{metformin:{}}})
    
                 case 2:
                 return await this.prisma.currentMedication.update({where:{id:getMedican.id},data:{atorvastalin:{}}})
    
                 case 3:
                 return await this.prisma.currentMedication.update({where:{id:getMedican.id},data:{lisinopril:{}}})
    
                 case 4:
                 return await this.prisma.currentMedication.update({where:{id:getMedican.id},data:{albuterolInhaler:{}}})
    
                 case 5:
                 return await this.prisma.currentMedication.update({where:{id:getMedican.id},data:{levothyroxine:{}}})
    
                 default:
                    throw new UnauthorizedException("Choice Valid Medican")
    
            }
    }
}