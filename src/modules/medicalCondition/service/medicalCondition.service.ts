import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/common/prisma/prisma.service";
import { createMedicalConditionDto } from "../dto/create.medicalCondition";

@Injectable()
export class MedicalConditionService {

  constructor(private prisma: PrismaService) { }

  async createMedicalCondition(sub: string, condition: createMedicalConditionDto) {

    let isExited = false
    let getCondition
    const getUser = await this.prisma.user.findUnique({ where: { sub } })
    if (!getUser) {
      return ""
    }
    getCondition = await this.prisma.medicalCondition.findUnique({ where: { userId: getUser.id } })
    isExited = getCondition ? true : false
    if (!getCondition) {
      getCondition = await this.prisma.medicalCondition.create({ data: { user: { connect: { id: getUser.id } } } })
        .then(() => { isExited = true })
    }

    if (isExited) {
      switch (condition.id) {
        case 1:
          return await this.prisma.medicalCondition.update({ where: { id: getCondition.id }, data: { diabetes: { description: condition.description, currentStatus: condition.currentStatus, medicationType: condition.medicationType, additionalNote: condition.additionalNote } } })

        case 1:
          return await this.prisma.medicalCondition.update({ where: { id: getCondition.id }, data: { hypertension: { description: condition.description, currentStatus: condition.currentStatus, medicationType: condition.medicationType, additionalNote: condition.additionalNote } } })

        case 1:
          return await this.prisma.medicalCondition.update({ where: { id: getCondition.id }, data: { asthma: { description: condition.description, currentStatus: condition.currentStatus, medicationType: condition.medicationType, additionalNote: condition.additionalNote } } })

        case 1:
          return await this.prisma.medicalCondition.update({ where: { id: getCondition.id }, data: { thyroidDisorder: { description: condition.description, currentStatus: condition.currentStatus, medicationType: condition.medicationType, additionalNote: condition.additionalNote } } })

        case 1:
          return await this.prisma.medicalCondition.update({ where: { id: getCondition.id }, data: { heartDisease: { description: condition.description, currentStatus: condition.currentStatus, medicationType: condition.medicationType, additionalNote: condition.additionalNote } } })
        default:
          throw new UnauthorizedException("Choice Valid Conditions")

      }
    }
    throw new UnauthorizedException("Invalid credentails")

  }

  async fetchMedicalCondition(sub: string) {
    const getUser = await this.prisma.user.findUnique({ where: { sub } })
    if (!getUser) {
      return ""
    }
    const getCondition = await this.prisma.medicalCondition.findUnique({ where: { userId: getUser.id } })
    if (!getCondition) {
      return ""
    }
    return getCondition
  }

  async deleteMedicalCondition(sub: string, condition: createMedicalConditionDto) {
    const getUser = await this.prisma.user.findUnique({ where: { sub } })
    if (!getUser) {
      return ""
    }
    const getCondition = await this.prisma.medicalCondition.findUnique({ where: { userId: getUser.id } })
    if (!getCondition) {
      return ""
    }

    switch (condition.id) {
      case 1:
        return await this.prisma.medicalCondition.update({ where: { id: getCondition.id }, data: { diabetes: {} } })

      case 1:
        return await this.prisma.medicalCondition.update({ where: { id: getCondition.id }, data: { hypertension: {} } })

      case 1:
        return await this.prisma.medicalCondition.update({ where: { id: getCondition.id }, data: { asthma: {} } })

      case 1:
        return await this.prisma.medicalCondition.update({ where: { id: getCondition.id }, data: { thyroidDisorder: {} } })

      case 1:
        return await this.prisma.medicalCondition.update({ where: { id: getCondition.id }, data: { heartDisease: {} } })
      default:
        throw new UnauthorizedException("Choice Valid Conditions")
    }
  }
}