import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from '../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from "../dtos/products.dtos";
import { ProductRepository } from "../repository/product.repository";

/**
 * Servicio del módulo de Productos
 * @author Duvan Manzano. - jhorman980815@gmail.com
 * @copyright Duvan 2022
 */
@Injectable()
export class ProductService {
  constructor(
    private productRepository: ProductRepository
  ) { }

  /**
   * Metodo para Consultar todos los productos
   * @returns {Promise<array<Product>>}
   */
  getAll(): Promise<Product[]> {
    return this.productRepository.getAll();
  }

  /**
   * Metodo para Consultar un producto por id
   * @param {string} id
   * @returns {Promise<Product>}
   */
  async findOne(id: string): Promise<Product> {
    return await this.productRepository.findOne(id);
  }

  /**
   * Metodo para guardar un producto
   * @param {CreateProductDto} product
   * @param {string} user
   * @returns {Promise<Product>}
   */
  store(product: CreateProductDto, user: string): Promise<Product> {
    return this.productRepository.store(product, user);
  }

  /**
   * Metodo para modificar un producto
   * @param {string} id del produto que se va actualizar
   * @param {UpdateProductDto} changes
   * @returns {Promise<Product>}
   */
  async update(id: string, changes: UpdateProductDto): Promise<Product> {
    const product = await this.productRepository.update(id, changes);
    if (!product) {
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
    return this.productRepository.remove(id);
  }

}
