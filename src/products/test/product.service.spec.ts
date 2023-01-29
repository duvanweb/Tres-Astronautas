import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../services/product.service';
import { ProductRepository } from '../repository/product.repository';

describe('ProductService', () => {
  let service: ProductService;
  const mockProductRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService, ProductRepository],
    })
    .overrideProvider(ProductRepository)
    .useValue(mockProductRepository)
    .compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
