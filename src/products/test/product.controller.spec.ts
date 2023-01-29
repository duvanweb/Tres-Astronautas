import { Test, TestingModule } from '@nestjs/testing';
import { CanActivate } from '@nestjs/common';
import { ProductController } from '../controllers/product.controller';
import { Product } from '../entities/product.entity';
import { ProductService } from '../services/product.service';
import { productStub } from './stubs/product.stub';
import { userStub } from '../..//users/tests/stubs/user.stub';
import { ProductServiceMocks } from './mocks/product.service';
import { OwnerGuard } from '../../auth/guards/owner.guard';
import { CreateProductDto } from '../dtos/products.dtos';

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;
  const ProductServiceProvider = { 
    provide: ProductService,
    useClass: ProductServiceMocks,
  };

  beforeEach(async () => {
    const mock_OwnerGuard: CanActivate = { canActivate: jest.fn(() => true) };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService, ProductServiceProvider],
    })
      .overrideProvider(ProductService).useClass(ProductServiceMocks)
      .overrideGuard(OwnerGuard).useValue(mock_OwnerGuard)
      .compile();

    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll', () => {
    describe('when getAll products is called', () => {
      let products: Product[];

      beforeEach(async () => {
        products = await controller.getAll();
      });

      test('then it should call productsService', () => {
        const getAllSpy = jest.spyOn(service, 'getAll');
        controller.getAll();
        expect(getAllSpy).toHaveBeenCalled();
      });

      test('then is should return a product', () => {
        expect(products).toEqual([productStub()]);
      });
    });
  });

  describe('store', () => {
    describe('when store products is called', () => {
      let products: Product;
      let data: CreateProductDto;
      let req: {};
      beforeEach(async () => {
        data = {
          name: productStub().name,
          price: productStub().price,
        }
        req = {
          user: {
            id: productStub().user.id,
            email: userStub().email
          }
        }
        products = await controller.store(data, req);
      });

      test('then it should call productsService', () => {
        const storeSpy = jest.spyOn(service, 'store');
        controller.store(data, req);
        expect(storeSpy).toHaveBeenCalledWith(data, req);
      });

      test('then is should return a product', () => {
        expect(products).toEqual(productStub());
      });
    });
  });


  describe('update', () => {
    describe('when update products is called', () => {
      let products: Product;
      let data: CreateProductDto;
      const id: string = '1234';
      beforeEach(async () => {
        data = {
          name: productStub().name,
          price: productStub().price,
        }
        products = await controller.update(id, data);
      });

      test('then it should call productsService', () => {
        const updateSpy = jest.spyOn(service, 'update');
        controller.update(id, data);
        expect(updateSpy).toHaveBeenCalledWith(id, data);
      });

      test('then is should return a product', () => {
        expect(products).toEqual(productStub());
      });
    });
  });

  describe('remove', () => {
    describe('when remove products is called', () => {
      let products: Product;
      const id: string = '1234';
      beforeEach(async () => {
        products = await controller.remove(id);
      });

      test('then it should call productsService', () => {
        const removeSpy = jest.spyOn(service, 'remove');
        controller.remove(id);
        expect(removeSpy).toHaveBeenCalledWith(id);
      });

      test('then is should return a product', () => {
        expect(products).toEqual(productStub());
      });
    });
  });
  

});
