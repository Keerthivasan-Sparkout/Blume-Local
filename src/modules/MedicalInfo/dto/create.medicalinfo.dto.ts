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


export class UpdateMedicalInfoDto {
    

    
        @IsEnum(ActivityLevel)
    @IsOptional()
    activityLevel: ActivityLevel | null

        @IsEnum(Gender)
    @IsOptional()
    gender: Gender | null

        @IsString()
    @IsOptional()
        height:string | null

        @IsString()
    @IsOptional()
        goalHeight: string | null

        @IsString()
    @IsOptional()
        weight: string | null

        @IsString()
    @IsOptional()
        goalWeight?:string | null

        @IsEnum(Smoking)
    @IsOptional()
    smoking: Smoking |null

        @IsString()
    @IsOptional()
        surgical?:string | null

        @IsString()
    @IsOptional()
        conditionName?: string | null

        @IsString()
    @IsOptional()
        diagnosisDate?:  Date | string | null

        @IsString()
    @IsOptional()
        conditionStatus?: string | null

        @IsString()
    @IsOptional()
        currentTreatement?: string | null


 @IsObject()
    @IsOptional()
    algerge: {id?:number, name: string, description: string }[]

       @IsObject()
    @IsOptional()
    currentMedication: {id?:number, name: string, description: string }[]
   

}