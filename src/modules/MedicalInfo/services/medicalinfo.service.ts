import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/common/prisma/prisma.service";
import { ActivityLevel, Gender, Smoking } from '@prisma/client';

@Injectable()
export class MedicalInfoServices {

    constructor(private prisma: PrismaService) { }

    // async addMedicalInfos(sub, info: CreateMedicalInfoDto) {
    // const getUser = await this.prisma.user.findUnique({ where: { sub } })
    // if (!getUser) {
    //     return "user not found"
    // }
    // await this.prisma.medicalInfo.create({
    //     data: {
    //         activityLevel: 'LOW',
    //         gender: 'MALE',
    //         height: info.height,
    //         goalHeight: info.goalHeight,
    //         weight: info.weight,
    //         goalWeight: info.goalWeight,
    //         smoking: 'No',
    //         surgical: info.surgical,
    //         conditionName: info.conditionName,
    //         diagnosisDate: new Date(info.diagnosisDate),
    //         conditionStatus: info.conditionStatus,
    //         currentTreatement: info.currentTreatement,
    //         user: { connect: { id: getUser.id} },
    //         algerge: this.createAlergeAndMedican(info.algerge),
    //         currentMedication: this.createAlergeAndMedican(info.currentMedication),

    //     }
    // })

    // return await this.prisma.medicalInfo.create({ data: { ...info, algerge:{ create:{updatedAlgerge}},currentMedication:{ create:{updatedMedican}}, user: { connect: { id: getUser.id } } } })
    // }

    createAlergeAndMedican(userAlerge: { id?: number, name: string, description: string }[]): { id: number, name: string, description: string }[] {
        // let temp:{id:number,name:string,description:string}[]
        // let c:{id:number,name:string,description:string}
        const lastId = userAlerge[userAlerge.length - 1]?.id ?? 0;

        const m = userAlerge.map((ele, index) => ({
            id: lastId + index + 1,
            name: ele.name,
            description: ele.description
        }));
        return m
    }

    async addAlerge(data: { name: string, description: string }, sub: string) {
        const getUser = await this.prisma.user.findUnique({ where: { sub } })
        if (!getUser) {
            return "user not found"
        }
        const getMedical = await this.prisma.medicalInfo.findFirst({ where: { userId: getUser.id } })
        if (!getMedical) {
            return "Fill your medical details"
        }
        const alerge = getMedical.algerge as { id: number, name: string, description: string }[]


    }

    async addMedicalInfo(obj: { activityLevel: ActivityLevel, gender: Gender, height: string, goalHeight: string, weight: string, goalWeight: string, smoking: Smoking, surgical: string }, sub: string) {

        const { activityLevel, gender, height, goalHeight, weight, goalWeight, smoking, surgical } = obj
        const active = activityLevel as ActivityLevel
        const genders = gender as Gender
        const smoke = smoking as Smoking
        const getUser = await this.prisma.user.findUnique({ where: { sub } })
        if (!getUser) {
            return ""
        }
        console.log(getUser)
        console.log("")
        const getMedical = await this.prisma.medicalInfo.findUnique({ where: { userId: getUser.id } })
        console.log(getMedical)
        if (!getMedical) {
            return "no"
        }
        return await this.prisma.medicalInfo.update({ where: { id: getMedical.id! }, data: { activityLevel: active, gender: genders, height, goalHeight, weight, goalWeight, smoking: smoke, surgical } })
    }

    // async addAlerges(datas: { id?: number, name: string, description: string } ,sub:string){
    //    const getUser=await this.prisma.user.findUnique({where:{sub}})
    //     if(!getUser){
    //         return ""
    //     }
    //     const getMedical=await this.prisma.medicalInfo.findUnique({where:{userId:getUser.id}})
    //     if(!getMedical){
    //         return ""
    //     }
    //     const alerge = (getMedical?.algerge as {  name: string, description: string }[]) || []
    //     // let newid
    //     // (alerge.length===0)?newid=1:newid=alerge[alerge.length-1].id+1 
    //     // datas.id=newid
    //     console.log(typeof alerge)
    //     console.log(alerge+"+++++++++++"+alerge.length)
    //     let updatedAlgerge
    //     if(alerge.length>0){
    //         updatedAlgerge= [...alerge,({name:datas.name,description:datas.description})]
    //     }else{
    //         updatedAlgerge=datas
    //     }

    //     // const alergesArray=await this.createAlergeAndMedican(datas)
    //  return await this.prisma.medicalInfo.update({where:{id:getMedical.id!},data:{algerge:datas}})

    // }

    async addAlerges(

  datas: { id?: number; name: string; description: string },

  sub: string

) {

  const getUser = await this.prisma.user.findUnique({

    where: { sub },

  });
 
  if (!getUser) {

    return 'User not found';

  }
 
  const getMedical = await this.prisma.medicalInfo.findUnique({

    where: { userId: getUser.id },

  });
 
  if (!getMedical) {

    return 'Medical info not found';

  }
 
  // Normalize algerge field to an array

  let existingAlerge = getMedical.algerge;
 
  let alergeArray: { name: string; description: string }[] = [];
 
  if (Array.isArray(existingAlerge)) {

    alergeArray = existingAlerge as typeof alergeArray;

  } else if (existingAlerge && typeof existingAlerge === 'object') {

    // If it's a single object by mistake

    alergeArray = [existingAlerge as { name: string; description: string }];

  }
 
  // Append new allergy

  const updatedAlerge = [...alergeArray, { name: datas.name, description: datas.description }];
 
  // Update in DB

  return await this.prisma.medicalInfo.update({

    where: { id: getMedical.id },

    data: { algerge: updatedAlerge },

  });

}
 
    async addMediclaCondition(obj: { conditionName: string, diagnosisDate: Date, conditionStatus: string, currentTreatement: string }, sub: string) {
        const getUser = await this.prisma.user.findUnique({ where: { sub } })
        if (!getUser) {
            return ""
        }
        const getMedical = await this.prisma.medicalInfo.findUnique({ where: { userId: getUser.id } })
        return await this.prisma.medicalInfo.update({ where: { id: getMedical?.id }, data: { conditionName: obj.conditionName, diagnosisDate:new Date( obj.diagnosisDate), conditionStatus: obj.conditionStatus, currentTreatement: obj.currentTreatement } })
    }

    async addCurrentMedican(datas: any, sub: string) {
        const getUser = await this.prisma.user.findUnique({ where: { sub } })
        if (!getUser) {
            return ""
        }
        const getMedical = await this.prisma.medicalInfo.findUnique({ where: { userId: getUser.id } })
        const medican = getMedical?.currentMedication as { id: number, name: string, description: string }[]
        const medicansArray = await this.createAlergeAndMedican(medican)
        return await this.prisma.medicalInfo.update({ where: { id: getMedical?.id }, data: { algerge: medicansArray } })
    }
}