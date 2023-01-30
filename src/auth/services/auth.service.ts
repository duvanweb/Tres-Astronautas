import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UserRepository } from '../../users/repository/user.repository';
import { User, UserDocument } from '../../users/entities/user.entity';
import { PayloadToken } from '../models/token.model';

/**
 * Servicio del módulo de Auth
 * @author Duvan Manzano. - jhorman980815@gmail.com
 * @copyright Duvan 2022
 */
@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository, private jwtService: JwtService) {}

  /**
   * Metodo para Validar usuario
   * @param {string} email
   * @param {string} password
   * @returns {Promise<User> | null}
   */
  async validateUser(email: string, password: string): Promise<User> | null {
    const user = await this.userRepository.findByEmail(email);
    
    const isMatch = await bcrypt.compare(password, user.password);
    if(user && isMatch){
      return user;
    }
    return null;
  }

  /**
   * Metodo para generar JWT
   * @param {User} user
   * @returns {object}
   */
  generateJWT(user: UserDocument): object {
    const payload: PayloadToken = { id: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    }
  }
}
