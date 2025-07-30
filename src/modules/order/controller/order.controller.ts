import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { OrderServices } from "../service/order.services";
import { ResponseUtil } from "src/common/utils/response.utils";

@Controller("/order")
export class OrderController{

    constructor(private orderService:OrderServices){}

    @Post("/:email")
    createOrders(@Param('email') email:string,@Body() data:any){
        const result = this.orderService.createOrder(data,email)
                return ResponseUtil.success("your porder has placed ", result)
        
    }

    @Get("/:email")
    getAllOrders(@Param('email') email:string){
        const result = this.orderService.fetchAllOrderByUser(email)
                return ResponseUtil.success("fetched all orders ", result)
        
    }
}