import { Injectable } from '@nestjs/common';
import { CreateUsersDto } from '../dtos/user.dtos';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../repository/user.repository';

/**
 * Servicio del módulo de usuarios
 * @author Duvan Manzano. - jhorman980815@gmail.com
 * @copyright Duvan 2023
 */
@Injectable()
export class UsersService {
  constructor(
    private userRepository: UserRepository
  ) { }

  /**
   * Metodo para guardar un usuario
   * @param {CreateUsersDto} user
   * @param {string} user
   * @returns {Promise<User>}
   */
  async store(user: CreateUsersDto): Promise<User> {
    user.password = await bcrypt.hash(user.password, 10);
    return await this.userRepository.store(user);
  }
}
