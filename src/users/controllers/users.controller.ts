import { Controller, Post, Body } from '@nestjs/common';
import { CreateUsersDto } from '../dtos/user.dtos';
import { UsersService } from './../services/users.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

/**
 * Controlador del módulo de usuarios
 * @author Duvan Manzano. - jhorman980815@gmail.com
 * @copyright Duvan 2023
 */
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {
  }

  /**
   * Metodo para crear un usuario
   * @param {CreateUsersDto} payload
   * @returns {Promise<User>}
   */
  @Post()
  @ApiOperation({ summary: 'Create a user'})
  async createUser(@Body() payload: CreateUsersDto): Promise<User> {
    return this.usersService.createUser(payload);
  }
}
