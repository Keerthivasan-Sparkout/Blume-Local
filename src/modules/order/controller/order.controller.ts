import { Body, Controller, Get, Param, Post, Request, UseGuards } from "@nestjs/common";
import { OrderServices } from "../service/order.services";
import { ResponseUtil } from "src/common/utils/response.utils";
import { AuthGuard } from "@nestjs/passport";

@Controller("/order")
export class OrderController{

    constructor(private orderService:OrderServices){}

    @Post("/:email")
    createOrders(@Param('email') email:string,@Body() data:any){
        const result = this.orderService.createOrder(data,email)
                return ResponseUtil.success("your porder has placed ", result)
        
    }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    async getAllOrders(@Request() req){
        const result = await this.orderService.fetchAllOrderByUser(req.user.sub)
                return ResponseUtil.success("fetched all orders ", result)
        
    }
}