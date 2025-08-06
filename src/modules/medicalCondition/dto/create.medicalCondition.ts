import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { MedicationType } from "../enum/medicationType.enum";
import { CurrentStatus } from "../enum/currentStatus.enum";

export class createMedicalConditionDto{

    @IsNumber()
    @IsNotEmpty()
     id :number

     @IsString()
     @IsNotEmpty()
     name:string

     @IsString()
     @IsNotEmpty()
     description :string

     @IsEnum(CurrentStatus)
     @IsNotEmpty()
     currentStatus :CurrentStatus

     @IsEnum(MedicationType)
     @IsNotEmpty()
     medicationType :MedicationType

     @IsString()
     @IsNotEmpty()
     additionalNote :string
  

}