import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/common/prisma/prisma.service";
import { ActivityLevel, Gender, Smoking } from '@prisma/client';
import { AllergeModel } from "../dto/allerges.model";
import { MedicalInfoModel } from "../dto/medical.info.model";
import { MediclaCondition } from "../dto/medicalcondition.model";
import { EditAllergeModel } from "../dto/edit.allerges.dto";

type allergeAndMedican={id:number, name: string; description: string }

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

  async addMedicalInfo(obj: MedicalInfoModel , sub: string) {
    const { activityLevel, gender, height, goalHeight, weight, goalWeight, smoking, surgical } = obj
    const active = activityLevel as ActivityLevel
    const genders = gender as Gender
    const smoke = smoking as Smoking
    const getUser = await this.prisma.user.findUnique({ where: { sub } })
    if (!getUser) {
      return ""
    }
    const getMedical = await this.prisma.medicalInfo.findUnique({ where: { userId: getUser.id } })
    if (!getMedical) {
      return "no"
    }
    return await this.prisma.medicalInfo.update({ where: { id: getMedical.id! }, data: { activityLevel: active, gender: genders, height, goalHeight, weight, goalWeight, smoking: smoke, surgical } })
  }

  async addAlerges(data: AllergeModel, sub: string) {
    const getUser = await this.prisma.user.findUnique({ where: { sub }, });

    if (!getUser) {
      return 'User not found';
    }
    const getMedical = await this.prisma.medicalInfo.findUnique({ where: { userId: getUser.id }, });
    if (!getMedical) {
      return 'Medical info not found';
    }
    let existingAlerge = getMedical.algerge;
    let alergeArray: allergeAndMedican[] = [];
    if (Array.isArray(existingAlerge)) {
      alergeArray = existingAlerge as typeof alergeArray;
    } else if (existingAlerge && typeof existingAlerge === 'object') {
      alergeArray = [existingAlerge as allergeAndMedican];
    }
  
    let newId=Math.max(...alergeArray.map(ele=>ele.id))
    newId<0?newId=0:newId
    const updatedAlerge = [...alergeArray, {id:newId+1, name: data.name, description: data.description }];
    
    return await this.prisma.medicalInfo.update({
      where: { id: getMedical.id },
      data: { algerge: updatedAlerge },
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

  async addCurrentMedican(datas: any, sub: string) {
    const getUser = await this.prisma.user.findUnique({ where: { sub } })
    if (!getUser) {
      return ""
    }
    const getMedical = await this.prisma.medicalInfo.findUnique({ where: { userId: getUser.id } })
    if(!getMedical){
      return ""
    }
    const medican = getMedical.currentMedication as allergeAndMedican[]
    const medicansArray = await this.createAlergeAndMedican(medican)
    return await this.prisma.medicalInfo.update({ where: { id: getMedical?.id }, data: { algerge: medicansArray } })
  }

  async editAllerges(sub:string,allerge: EditAllergeModel){
   const getUser = await this.prisma.user.findUnique({ where: { sub } })
    if (!getUser) {
      return ""
    }
    const getMedical = await this.prisma.medicalInfo.findUnique({ where: { userId: getUser.id } })
    if(!getMedical){
      return ""
    }
   let existingAlerge = getMedical.algerge;
   let updateAllerges:number=-1
    let alergeArray: allergeAndMedican[] = [];
    if (Array.isArray(existingAlerge)) {
      alergeArray = existingAlerge as typeof alergeArray;
    } else if (existingAlerge && typeof existingAlerge === 'object') {
      alergeArray = [existingAlerge as allergeAndMedican];
    }
    const editAllerge=alergeArray.filter(ele=>(ele.id===allerge.id))
    if(!editAllerge){
      return "Allerge not found"
    }
    console.log(allerge)
    
    editAllerge.map(ele=>{
      console.log(ele)
      if(ele.id===allerge.id){
        console.log("yes")
        console.log(editAllerge.indexOf(ele))
       updateAllerges= editAllerge.indexOf(ele)
      }
    })
    if(updateAllerges<=-1){
       throw new UnauthorizedException("Allerge Not found")
      }
    editAllerge[updateAllerges]=allerge
    return await this.prisma.medicalInfo.update({
      where: { id: getMedical.id },
      data: { algerge: editAllerge },
    });
  }

  async deleteAllerge(sub:string,allerge:EditAllergeModel){
     const getUser = await this.prisma.user.findUnique({ where: { sub } })
    if (!getUser) {
      return ""
    }
    const getMedical = await this.prisma.medicalInfo.findUnique({ where: { userId: getUser.id } })
    if(!getMedical){
      return ""
    }
   let existingAlerge = getMedical.algerge;
    let alergeArray: allergeAndMedican[] = [];
    if (Array.isArray(existingAlerge)) {
      alergeArray = existingAlerge as typeof alergeArray;
    } else if (existingAlerge && typeof existingAlerge === 'object') {
      alergeArray = [existingAlerge as allergeAndMedican];
    }
    const newAllerge=alergeArray.filter(ele=>(ele.id!==allerge.id))
     return await this.prisma.medicalInfo.update({
      where: { id: getMedical.id },
      data: { algerge: newAllerge },
    });
  }
}