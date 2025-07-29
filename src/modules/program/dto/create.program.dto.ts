import {  IsNotEmpty, IsString } from "class-validator"

export class CreateProgramDto {

    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    description: string

    @IsString()
    totalDuration: Date

}

