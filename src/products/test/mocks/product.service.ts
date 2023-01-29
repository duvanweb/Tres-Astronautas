import { Product } from '../../entities/product.entity';
import { productStub } from '../stubs/product.stub';
import { CreateProductDto, UpdateProductDto } from '../../dtos/products.dtos';
export class ProductServiceMocks {
  getAll(): Promise<Product[]> {
    return Promise.resolve([productStub()]);
  }

  store(product: CreateProductDto, req: any): Promise<Product> {
    return Promise.resolve({
      ...product,
      user: productStub().user
    });
  }

  update(id: string, product: UpdateProductDto): Promise<Product> {
    return Promise.resolve(productStub());
  }

  remove(id: string): Promise<Product> {
    return Promise.resolve(productStub());
  }
}