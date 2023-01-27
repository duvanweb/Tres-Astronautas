import { Module } from '@nestjs/common';
import { ProductController } from './controllers/product.controller';
import { ProductService } from './services/product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema, Product } from './entities/product.entity';
import { ProductRepository } from './repository/product.repository';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Product.name,
      schema: ProductSchema
    },]
  )],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository]
})
export class ProductsModule {}
