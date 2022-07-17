import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from "../dtos/products.dtos";

/**
 * Servicio del módulo de Productos
 * @author Duvan Manzano. - jhorman980815@gmail.com
 * @copyright Duvan 2022
 */
@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>
  ) { }

  /**
   * Metodo para Consultar todos los productos
   * @returns {Promise<array<Product>>}
   */
  getAll(): Promise<Product[]> {
    return this.productModel.find().populate('user').exec();
  }

  /**
   * Metodo para Consultar un producto por id
   * @param {string} id
   * @returns {Promise<Product>}
   */
  async findOne(id: string): Promise<Product> {
    return await this.productModel.findOne({ id }).exec();
  }

  /**
   * Metodo para guardar un producto
   * @param {CreateProductDto} product
   * @param {string} user
   * @returns {Promise<Product>}
   */
  store(product: CreateProductDto, user: string): Promise<Product> {
    const newProduct = new this.productModel({ ...product, user });
    return newProduct.save();
  }

  /**
   * Metodo para modificar un producto
   * @param {string} id del produto que se va actualizar
   * @param {UpdateProductDto} changes
   * @returns {Promise<Product>}
   */
  update(id: string, changes: UpdateProductDto): Promise<Product> {
    const product = this.productModel.findByIdAndUpdate(id,{ $set: changes }, { new: true}).exec();
    if(!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  /**
   * Metodo para eliminar un producto
   * @param {string} id del produto que se va eliminar
   * @returns {any}
   */
  remove(id: string): any {
    return this.productModel.findByIdAndDelete(id);
  }

}
