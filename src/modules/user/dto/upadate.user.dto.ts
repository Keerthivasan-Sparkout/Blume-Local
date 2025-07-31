// dto/signup.dto.ts
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class UserUpdateDto{

    @IsString()
    @IsNotEmpty()
    fullName: string

    @IsString()
    @IsNotEmpty()
    gender: string 

    @IsEmail()
    @IsNotEmpty()
    DoB: string

    @IsString()
    @IsNotEmpty()
    @MaxLength(10)
    mobile:number

}
