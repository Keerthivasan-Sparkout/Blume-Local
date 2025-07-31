import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class createAddressDto {

    @IsNumber()
    @IsNotEmpty()
    houseNo: number

    @IsString()
    @IsNotEmpty()
    area: string

    @IsString()
    @IsNotEmpty()
    city: string

    @IsString()
    @IsNotEmpty()
    state: string

    @IsNumber()
    @IsNotEmpty()
    zipCode: number

    @IsString()
    @IsNotEmpty()
    addresType: string

    @IsBoolean()
    @IsNotEmpty()
    default: boolean | false

    @IsNumber()
    @IsOptional()
    user:object

}