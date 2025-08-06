// dto/signup.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class UserUpdateDto{

    @IsString()
    @IsNotEmpty()
    @ApiProperty({example:'Ram Kumar'})
    fullName: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({example:"male"})
    gender: string 

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({example:"25 may 2010"})
    DoB: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({example:9876543334})
    mobile:number

}
