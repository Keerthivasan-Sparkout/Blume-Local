import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { AllergesStatus,  } from "../enum/allerges.status.enum";
import { AllergesSeverity } from "../enum/allerge.severity.enum";


export class CreateAllergesDto{

    @IsNumber()
    @IsNotEmpty()
    id:number

    @IsString()
    @IsNotEmpty()
    name:string


    @IsString()
    @IsNotEmpty()
    description:string

    @IsString()
    @IsNotEmpty()
    reactions:string

    @IsEnum(AllergesStatus)
    @IsNotEmpty()
    status:AllergesStatus

    @IsEnum(AllergesSeverity)
    @IsNotEmpty()
    severity:AllergesSeverity

}