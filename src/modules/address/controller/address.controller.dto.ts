import { Body, Controller, Get, Param, Post, Request, UseGuards } from "@nestjs/common";
import { AdddressServices } from "../service/address.services";
import { AuthGuard } from "@nestjs/passport";
import { ResponseUtil } from "src/common/utils/response.utils";

@Controller("/address")
@UseGuards(AuthGuard('jwt'))
export class AddressController {

    constructor(private addressService: AdddressServices) { }


    @Post()
    async addAddressToUser(@Request() req, @Body() address: any) {
        const result = await this.addressService.addAddressToUser(address, req.user.sub)
        return ResponseUtil.success("Address will added successfully",result)

    }

    @Get("/:type")
    async fetchAddress(@Request() req,@Param('type') type:string){
         const result =await this.addressService.fetchAddress(type,req.user.sub)
         return ResponseUtil.success("Address fetched Successfully",result)
    }

    

}