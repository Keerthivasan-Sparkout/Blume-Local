import { IsEnum, IsNotEmpty, IsString } from "class-validator"
import { $Enums, Gender } from "@prisma/client"


export class MedicalInfoModel {


    @IsEnum($Enums.ActivityLevel)
    @IsNotEmpty()
    activityLevel: $Enums.ActivityLevel

    @IsEnum($Enums.Gender)
    @IsNotEmpty()
    gender: $Enums.Gender

    @IsString()
    @IsNotEmpty()
    height: string

    @IsString()
    @IsNotEmpty()
    goalHeight: string

    @IsString()
    @IsNotEmpty()
    weight: string

    @IsString()
    @IsNotEmpty()
    goalWeight: string

    @IsEnum($Enums.Smoking)
    @IsNotEmpty()
    smoking: $Enums.Smoking

    @IsString()
    @IsNotEmpty()
    surgical: string
}