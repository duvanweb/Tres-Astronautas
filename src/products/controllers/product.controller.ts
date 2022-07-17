import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ProductService } from '../services/product.service';
import { Product } from '../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from "../dtos/products.dtos";
import { MongoIdPipe } from '../../common/mongo-id.pipe';
import { OwnerGuard } from '../../auth/guards/owner.guard';
import { PayloadToken } from '../../auth/models/token.model';


/**
 * Controlador del módulo de Productos
 * @author Duvan Manzano. - jhorman980815@gmail.com
 * @copyright Duvan 2022
 */
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@ApiTags('Products')
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  /**
   * Metodo para listar todos los productos
   * @returns {Promise<array<Product>>}
   */
  @Get()
  @ApiOperation({ summary: 'List of products'})
  getAll(): Promise<Product[]> {
    return this.productService.getAll();
  }

  /**
   * Metodo para crear un producto
   * @param {CreateProductDto} payload
   * @param {Request} req
   * @returns {Promise<Product>}
   */
  @Post()
  @ApiOperation({ summary: 'Create a product'})
  store(@Body() payload: CreateProductDto, @Request() req): Promise<Product> {
    const user: PayloadToken = req.user;
    return this.productService.store(payload, user.id);
  }

  /**
   * Metodo para actualizar un producto
   * @param {string} id del produto que se va actualizar
   * @param {UpdateProductDto} payload
   * @returns {Promise<Product>}
   */
  @UseGuards(OwnerGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Update a product'})
  update(@Param('id', MongoIdPipe) id: string, @Body() payload: UpdateProductDto): Promise<Product> {
    return this.productService.update(id, payload);
  }

  /**
   * Metodo para eliminar un producto
   * @param {string} id del produto que se va eliminar
   * @returns {any}
   */
  @UseGuards(OwnerGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product'})
  remove(@Param('id', MongoIdPipe) id: string): any {
    return this.productService.remove(id);
  }


}
