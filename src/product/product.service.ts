import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {}

  async findAll(): Promise<Product[]> {
    return await this.productModel.find().exec();
  }

  async findOne(id: string): Promise<Product> {
    return await this.productModel.findById(id).exec();
  }

  async createProduct(product: CreateProductDto): Promise<Product> {
    const newProduct = new this.productModel(product);
    return await newProduct.save();
  }

  async updateProduct(id: string, product: UpdateProductDto): Promise<Product> {
    const existingProduct = await        this.productModel.findByIdAndUpdate(id, product, { new: true });
    if (!existingProduct) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return existingProduct;
  }

  async deleteProduct(id: string): Promise<Product> {
    const deletedProduct = await this.productModel.findByIdAndDelete(id);
    if (!deletedProduct) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return deletedProduct;
  }
}