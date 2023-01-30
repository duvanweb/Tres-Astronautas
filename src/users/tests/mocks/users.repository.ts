import { CreateUsersDto } from '../../dtos/user.dtos';
import { User } from '../../entities/user.entity';

export class UsersRepositoryMock {
  async store(user: CreateUsersDto): Promise<User> { 
    return Promise.resolve(user);
  }
}