import { IsDate, IsNotEmpty, IsString } from "class-validator"

export class MediclaCondition { 
    
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

}