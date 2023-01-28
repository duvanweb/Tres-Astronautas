import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../services/users.service';
import { CreateUsersDto } from '../dtos/user.dtos';
import { UserRepository } from '../repository/user.repository';
import { userStub } from './stubs/user.stub';
import { UsersRepositoryMock } from './mocks/users.repository';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

describe('UsersService', () => {
  let service: UsersService;
  const UsersRepositoryProvider = { 
    provide: UserRepository,
    useClass: UsersRepositoryMock,
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        UsersRepositoryProvider,
      ],
    }).overrideProvider(UserRepository)
    .useClass(UsersRepositoryMock)
    .compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const data: CreateUsersDto = {
      name: userStub().name,
      email: userStub().email,
      password: userStub().password
    };
    const user = await service.createUser(data);
    const response = userStub();
    response.password = user.password
    expect(user).toEqual(response);
  });

});
