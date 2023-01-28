import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../controllers/users.controller';
import { UsersService } from '../services/users.service';
import { userStub } from './stubs/user.stub';
import { User } from '../entities/user.entity';
import { CreateUsersDto } from '../dtos/user.dtos';
import { UsersServiceMock } from './mocks/users.service';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;
  beforeEach(async () => {
    const UsersServiceProvider = { 
      provide: UsersService,
      useClass: UsersServiceMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, UsersServiceProvider],
    }).overrideProvider(UsersService)
    .useClass(UsersServiceMock)
    .compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  describe('createUser', () => {
    describe('when createUser is called', () => {
      let user: User;
      let data: CreateUsersDto;

      beforeEach(async () => {
        data = {
          name: userStub().name,
          email: userStub().email,
          password: userStub().password
        };
        user = await usersController.createUser(data);
      });
      test('then it should return a user', () => {
        expect(user).toEqual(userStub());
      });
      test('then it should call usersService', () => {
        const createUserSpy = jest.spyOn(usersService, 'createUser');
        usersController.createUser(data);
        expect(createUserSpy).toHaveBeenCalledWith(data);
      });
    })
  });


  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });
});
