import { Controller } from "@nestjs/common";
import { InvoiceService } from "../service/invoice.service";

@Controller('/invoice')
export class InvoiceController{

    constructor(invoiceService:InvoiceService){}
}