import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Frequency } from "../enum/frequency.enum";

export class CreateCurrentMedicanDto{

    @IsNumber()
    @IsNotEmpty()
    id:number

    @IsString()
    @IsNotEmpty()
    name:string

    @IsString()
    @IsNotEmpty()
    description:string

    @IsEnum(Frequency)
    @IsNotEmpty()
    frequency:Frequency
    
}