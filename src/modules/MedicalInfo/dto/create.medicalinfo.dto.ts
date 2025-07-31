import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from "class-validator"

enum ActivityLevel {
    LOW,
    MODERATLY_ACTIVE
}

enum Gender {
    MALE,
    FEMALE
}

enum Smoking {
    YES,
    No
}


export class CreateMedicalInfoDto {

    @IsEnum(ActivityLevel)
    @IsNotEmpty()
    activityLevel: ActivityLevel

    @IsEnum(Gender)
    @IsNotEmpty()
    gender: Gender

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

    @IsEnum(Smoking)
    @IsNotEmpty()
    smoking: Smoking

    @IsString()
    @IsOptional()
    surgical: string

    @IsObject()
    @IsOptional()
    algerge: { name: string, description: string }

    @IsString()
    @IsNotEmpty()
    conditionName: string

    @IsDate()
    @IsNotEmpty()
    diagnosisDate: Date

    @IsString()
    @IsNotEmpty()
    conditionStatus: string

    @IsString()
    @IsNotEmpty()
    currentTreatement: string

    @IsObject()
    @IsOptional()
    currentMedication: { name: string, description: string }

   

}