import { Module } from '@nestjs/common';
import { ProductController } from './controllers/product.controller';
import { ProductService } from './services/product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema, Product } from './entities/product.entity';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Product.name,
      schema: ProductSchema
    },]
  )],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductsModule {}
