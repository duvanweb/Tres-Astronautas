import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUsersDto } from '../dtos/user.dtos';
import { User } from '../entities/user.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';


/**
 * Servicio del módulo de usuarios
 * @author Duvan Manzano. - jhorman980815@gmail.com
 * @copyright Duvan 2022
 */
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>
  ) { }

  /**
   * Metodo para guardar un usuario
   * @param {CreateUsersDto} user
   * @param {string} user
   * @returns {Promise<object>}
   */
  async store(user: CreateUsersDto): Promise<object> {
    const newUser = new this.userModel(user);
    newUser.password = await bcrypt.hash(newUser.password,10);
    const model = await newUser.save();
    const { password, ...rta } = model.toJSON();
    return rta;
  }

  /**
   * Metodo para Consultar un usuario por email
   * @param {string} email
   * @returns {Promise<User>}
   */
  findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }
}
