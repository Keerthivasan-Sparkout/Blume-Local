import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from "class-validator"



export class MedicanModel{
    

    @IsNumber()
    @IsOptional()
    id?:number

    @IsString()
    @IsNotEmpty()
    name:string

    @IsString()
    @IsNotEmpty()
    description:string
}