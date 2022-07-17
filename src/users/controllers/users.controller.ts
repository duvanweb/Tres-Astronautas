import { Controller, Post, Body } from '@nestjs/common';
import { CreateUsersDto } from '../dtos/user.dtos';
import { UsersService } from './../services/users.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

/**
 * Controlador del módulo de usuarios
 * @author Duvan Manzano. - jhorman980815@gmail.com
 * @copyright Duvan 2022
 */
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {
  }

  /**
   * Metodo para crear un usuario
   * @param {CreateUsersDto} payload
   * @returns {Promise<object>}
   */
  @Post()
  @ApiOperation({ summary: 'Create a user'})
  store(@Body() payload: CreateUsersDto): Promise<object> {
    return this.usersService.store(payload);
  }
}
