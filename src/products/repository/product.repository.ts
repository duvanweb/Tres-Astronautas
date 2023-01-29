import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from "../dtos/products.dtos";

/**
 * Servicio del módulo de Productos
 * @author Duvan Manzano. - jhorman980815@gmail.com
 * @copyright Duvan 2022
 */
@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>
  ) { }

  /**
   * Metodo para Consultar todos los productos
   * @returns {Promise<array<Product>>}
   */
  async getAll(): Promise<Product[]> {
    return this.productModel.find().populate('user').exec();
  }

  /**
   * Metodo para Consultar un producto por id
   * @param {string} id
   * @returns {Promise<Product>}
   */
  async findOne(id: string): Promise<Product> {
    return this.productModel.findOne({ id }).exec();
  }

  /**
   * Metodo para guardar un producto
   * @param {CreateProductDto} product
   * @param {string} user
   * @returns {Promise<Product>}
   */
  async store(product: CreateProductDto, user: string): Promise<Product> {
    return new this.productModel({ ...product, user }).save();
  }

  /**
   * Metodo para modificar un producto
   * @param {string} id del produto que se va actualizar
   * @param {UpdateProductDto} changes
   * @returns {Promise<Product>}
   */
  async update(id: string, changes: UpdateProductDto): Promise<Product> {
    return this.productModel.findByIdAndUpdate(id,{ $set: changes }, { new: true}).exec();;
  }

  /**
   * Metodo para eliminar un producto
   * @param {string} id del produto que se va eliminar
   * @returns {any}
   */
  async remove(id: string): Promise<Product> {
    return this.productModel.findByIdAndDelete(id);
  }

}
