import { User } from '../../entities/user.entity';

export const userStub = (): User => {
 return {
    id: '1',
    name: 'test',
    email: 'test@example.com',
    password: '1234',
  }
}