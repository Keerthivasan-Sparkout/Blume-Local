// dto/signup.dto.ts
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UserUpdateDto{

    @IsString()
    @IsOptional()
    firstName: string

    @IsString()
    @IsOptional()
    lastName: string 

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsOptional()
    country: string

    @IsString()
    @IsOptional()
    language: string 

    @IsString()
    @IsOptional()
    mobile: string 

    @IsString()
    @IsOptional()
    emailToken: string 

    @IsString()
    @IsOptional()
    googleToken: string 

    @IsString()
    @IsOptional()
    appleToken: string 

}
