import { userStub } from '../stubs/user.stub';
import { CreateUsersDto } from '../../dtos/user.dtos';
import { User } from '../../entities/user.entity';

export class UsersServiceMock {
  async createUser(user: CreateUsersDto): Promise<User> { 
    return Promise.resolve(user);
  }
}