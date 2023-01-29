import { userStub } from '../../../users/tests/stubs/user.stub';
import { Product } from '../../entities/product.entity';

export const productStub = (): Product => {
 return {
    name: 'test',
    price: 1000,
    user: userStub()
  }
}