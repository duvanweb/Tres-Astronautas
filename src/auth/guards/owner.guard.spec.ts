import { OwnerGuard } from './owner.guard';
import { ProductRepository } from '../../products/repository/product.repository';
describe('OwnerGuard', () => {
  let productRepository: ProductRepository;
  it('should be defined', () => {
    expect(new OwnerGuard(productRepository)).toBeDefined();
  });
});
