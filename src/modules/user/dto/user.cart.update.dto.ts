import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UserCartDto{

    @IsNumber()
    @IsNotEmpty()
    id: number;

    @IsString()
    @IsOptional()
    firstName: string

    @IsString()
    @IsOptional()
    lastName: string 

    @IsString()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    sub: string;

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