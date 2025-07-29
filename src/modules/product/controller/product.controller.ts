import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ProductServices } from "../service/product.service";
import { CreateProductDto } from "../dto/create.product.dto";
import { ResponseUtil } from "src/common/utils/response.utils";

@Controller("/product")
export class ProductController {

    constructor(private productService: ProductServices) { }

    @Post()
    async createProduct(@Body() product: CreateProductDto) {
        const result = await this.productService.createProducts(product)
        return ResponseUtil.success("Product created successfully", result)
    }

    @Get("/:name")
    async getProduct(@Param('name') name: string) {
        const result = await this.productService.getProductByName(name)
        return ResponseUtil.success("Fetch product successfully ", result)
    }

    @Patch()
    async updateProduct(@Body() product: CreateProductDto) {
        const result = await this.productService.updateProduct(product, product.name)
        return ResponseUtil.success("Update product successfully ", result)
    }

    @Delete("/:name")
    async deleteProduct(@Param('name') name: string) {
        const result = await this.productService.deleteProduct(name)
        return ResponseUtil.success("Delete product successfully ", result)
    }

}