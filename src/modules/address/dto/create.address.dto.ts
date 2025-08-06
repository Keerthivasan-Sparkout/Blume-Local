import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator"
import { AddressType } from "../enum/addresstype.enum.type"
import { ApiProperty } from "@nestjs/swagger"

export class CreateAddressDto {

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({example:'23'})
    houseNo: number

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    area: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    city: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    state: string

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    zipCode: number

    @IsEnum(AddressType)
    @IsNotEmpty()
    @ApiProperty()
    addresType: AddressType

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty()
    default: boolean
}

