import { Injectable } from "@nestjs/common";

@Injectable()
export class InvoiceService{

    constructor(private invoiceService:InvoiceService){}

}