import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/common/prisma/prisma.service";
import { ActivityLevel, Gender, Smoking } from '@prisma/client';
import { MediclaCondition } from "../dto/medicalcondition.model";
import { MedicanModel } from "../dto/medicans.model";
import { EditMedicanModel } from "../dto/edit.allerges.dto";

type Medican={id:number, name: string; description: string }

@Injectable()
export class MedicalInfoServices {

  constructor(private prisma: PrismaService) { }

  createAlergeAndMedican(userAlerge: { id?:number, name: string, description: string }[]): { id: number, name: string, description: string }[] {
    const lastId = userAlerge[userAlerge.length - 1]?.id ?? 0;
    const alergeArray = userAlerge.map((ele, index) => ({
      id: lastId + index + 1,
      name: ele.name,
      description: ele.description
    }));
    return alergeArray
  }

  // async addMedicalInfo(obj: MedicalInfoModel , sub: string) {
  //   const { activityLevel, gender, height, goalHeight, weight, goalWeight, smoking, surgical } = obj
  //   const active = activityLevel as ActivityLevel
  //   const genders = gender as Gender
  //   const smoke = smoking as Smoking
  //   const getUser = await this.prisma.user.findUnique({ where: { sub } })
  //   if (!getUser) {
  //     return ""
  //   }
  //   const getMedical = await this.prisma.medicalInfo.findUnique({ where: { userId: getUser.id } })
  //   if (!getMedical) {
  //     return "no"
  //   }
  //   return await this.prisma.medicalInfo.update({ where: { id: getMedical.id! }, data: { activityLevel: active, gender: genders, height, goalHeight, weight, goalWeight, smoking: smoke, surgical } })
  // }

  async addCurrentMedican(data: MedicanModel, sub: string) {
    const getUser = await this.prisma.user.findUnique({ where: { sub }, });

    if (!getUser) {
      return 'User not found';
    }
    const getMedical = await this.prisma.medicalInfo.findUnique({ where: { userId: getUser.id }, });
    if (!getMedical) {
      return 'Medical info not found';
    }
    let existingMedican = getMedical.currentMedication;
    let medicanArray: Medican[] = [];
    if (Array.isArray(existingMedican)) {
      medicanArray = existingMedican as typeof medicanArray;
    } else if (existingMedican && typeof existingMedican === 'object') {
      medicanArray = [existingMedican as Medican];
    }
  
    let newId=Math.max(...medicanArray.map(ele=>ele.id))
    newId<0?newId=0:newId
    const updatedMedican = [...medicanArray, {id:newId+1, name: data.name, description: data.description }];
    
    return await this.prisma.medicalInfo.update({
      where: { id: getMedical.id },
      data: { currentMedication: updatedMedican },
    });
  }

  async addMediclaCondition(medicalcondition:MediclaCondition, sub: string) {
    const getUser = await this.prisma.user.findUnique({ where: { sub } })
    if (!getUser) {
      return ""
    }
    const getMedical = await this.prisma.medicalInfo.findUnique({ where: { userId: getUser.id } })
    if(!getMedical){
      return ""
    }
    return await this.prisma.medicalInfo.update({ where: { id: getMedical.id }, data: { conditionName: medicalcondition.conditionName, diagnosisDate: new Date(medicalcondition.diagnosisDate), conditionStatus: medicalcondition.conditionStatus, currentTreatement: medicalcondition.currentTreatement } })
  }


  // async editAllerges(sub:string,allerge: EditAllergeModel){
  //  const getUser = await this.prisma.user.findUnique({ where: { sub } })
  //   if (!getUser) {
  //     return ""
  //   }
  //   const getMedical = await this.prisma.medicalInfo.findUnique({ where: { userId: getUser.id } })
  //   if(!getMedical){
  //     return ""
  //   }
  //  let existingAlerge = getMedical.algerge;
  //  let updateAllerges:number=-1
  //   let alergeArray: allergeAndMedican[] = [];
  //   if (Array.isArray(existingAlerge)) {
  //     alergeArray = existingAlerge as typeof alergeArray;
  //   } else if (existingAlerge && typeof existingAlerge === 'object') {
  //     alergeArray = [existingAlerge as allergeAndMedican];
  //   }
  //   const editAllerge=alergeArray.filter(ele=>(ele.id===allerge.id))
  //   if(!editAllerge){
  //     return "Allerge not found"
  //   }
  //   console.log(allerge)
    
  //   editAllerge.map(ele=>{
  //     console.log(ele)
  //     if(ele.id===allerge.id){
  //       console.log("yes")
  //       console.log(editAllerge.indexOf(ele))
  //      updateAllerges= editAllerge.indexOf(ele)
  //      return [...]
  //     }
  //   })
  //   if(updateAllerges<=-1){
  //      throw new UnauthorizedException("Allerge Not found")
  //     }
  //   editAllerge[updateAllerges]=allerge
  //   return await this.prisma.medicalInfo.update({
  //     where: { id: getMedical.id },
  //     data: { algerge: editAllerge },
  //   });
  // }

  async editAllerges(sub:string,medican: EditMedicanModel){
   const getUser = await this.prisma.user.findUnique({ where: { sub } })
    if (!getUser) {
      return ""
    }
    const getMedical = await this.prisma.medicalInfo.findUnique({ where: { userId: getUser.id } })
    if(!getMedical){
      return ""
    }
   let existingMedican= getMedical.currentMedication;
   let updateMedicans:number=-1
    let medicanArray: Medican[] = [];
    if (Array.isArray(existingMedican)) {
      medicanArray = existingMedican as typeof medicanArray;
    } else if (existingMedican && typeof existingMedican === 'object') {
      medicanArray = [existingMedican as Medican];
    }
    const editMedican=medicanArray.filter(ele=>(ele.id===medican.id))
    if(!editMedican){
      return "Allerge not found"
    }
    console.log(medican)
    
    editMedican.map(ele=>{
      console.log(ele)
      if(ele.id===medican.id){
        console.log("yes")
        console.log(editMedican.indexOf(ele))
        ele=medican
       return [...editMedican,ele]
      }
    })
    if(updateMedicans<=-1){
       throw new UnauthorizedException("Allerge Not found")
      }
    // editMedican[updateMedicans]=medican
    return await this.prisma.medicalInfo.update({
      where: { id: getMedical.id },
      data: { currentMedication: editMedican },
    });
  }

  async deleteCurrentMedican(sub:string,medican:EditMedicanModel){
     const getUser = await this.prisma.user.findUnique({ where: { sub } })
    if (!getUser) {
      return ""
    }
    const getMedical = await this.prisma.medicalInfo.findUnique({ where: { userId: getUser.id } })
    if(!getMedical){
      return ""
    }
   let existingMedican = getMedical.currentMedication;
    let medicanArray: Medican[] = [];
    if (Array.isArray(existingMedican)) {
      medicanArray = existingMedican as typeof medicanArray;
    } else if (existingMedican && typeof existingMedican === 'object') {
      medicanArray = [existingMedican as Medican];
    }
    const newMedican=medicanArray.filter(ele=>(ele.id!==medican.id))
     return await this.prisma.medicalInfo.update({
      where: { id: getMedical.id },
      data: { currentMedication: newMedican },
    });
  }
}