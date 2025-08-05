import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/common/prisma/prisma.service";
import { MediclaCondition } from "../dto/medicalcondition.model";
import { MedicanModel } from "../dto/medicans.model";
import { EditMedicanModel } from "../dto/edit.allerges.dto";

type Medican={id:number, name: string; description: string }

@Injectable()
export class MedicalInfoServices {

  constructor(private prisma: PrismaService) { }

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

  async editCurrentMedican(sub:string,medican: EditMedicanModel){
   const getUser = await this.prisma.user.findUnique({ where: { sub } })
    if (!getUser) {
      return ""
    }
    const getMedical = await this.prisma.medicalInfo.findUnique({ where: { userId: getUser.id } })
    if(!getMedical){
      return ""
    }
   let existingMedican= getMedical.currentMedication;
    let medicanArray: Medican[] = [];
    if (Array.isArray(existingMedican)) {
      medicanArray = existingMedican as typeof medicanArray;
    } else if (existingMedican && typeof existingMedican === 'object') {
      medicanArray = [existingMedican as Medican];
    }
    let isMedican=false
    medicanArray.forEach(ele=>{
      if(ele.id===medican.id){
        isMedican=true
        ele.name=medican.name
        ele.description=medican.description
      }
    })
  //   let isMedican=false
  //  existingMedican(ele=>{
  //     if(ele.id===medican.id){
  //       isMedican=true
  //       ele.name=medican.name,
  //       ele.description=medican.description
  //     }
  //  })
    if(!isMedican){
       throw new UnauthorizedException("Allerge Not found")
      }
    
    return await this.prisma.medicalInfo.update({
      where: { id: getMedical.id },
      data: { currentMedication: medicanArray },
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