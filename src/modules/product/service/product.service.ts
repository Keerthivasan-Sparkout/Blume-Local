
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Prisma } from '@prisma/client';
import { PrismaService } from "src/common/prisma/prisma.service";

@Injectable()
export class ProductServices {

    constructor(private prisma: PrismaService) { }

    async createProducts(data: Prisma.ProductCreateInput) {
        const getProduct = await this.prisma.product.findUnique({ where: { name: data.name } })
        if (getProduct) {
            return getProduct;
        }
        return await this.prisma.product.create({ data })
    }

    async getProductByName(name: string) {
        const getProduct = await this.prisma.product.findUnique({ where: { name } })
        return getProduct ? getProduct : null;
    }

    async updateProduct(data: Prisma.ProductUpdateInput, name: string) {
        const getProduct = await this.prisma.product.findUnique({ where: { name } })
        if (!getProduct) {
            throw new UnauthorizedException("Product not found")
        }
        return await this.prisma.product.update({ where: { id: getProduct.id }, data })
    }

    async deleteProduct(name: string) {
        const getProduct = await this.prisma.product.findUnique({ where: { name } })
        if (!getProduct) {
            return "Product not found"
        }
        return await this.prisma.product.delete({ where: { id: getProduct.id } })
    }

}