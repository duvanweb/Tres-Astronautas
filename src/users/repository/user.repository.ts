import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUsersDto } from '../dtos/user.dtos';
import { User } from '../entities/user.entity';
import { Model } from 'mongoose';


/**
 * Servicio del módulo de usuarios
 * @author Duvan Manzano. - jhorman980815@gmail.com
 * @copyright Duvan 2023
 */
@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>
  ) { }

  /**
   * Metodo para guardar un usuario
   * @param {CreateUsersDto} user
   * @param {string} user
   * @returns {Promise<User>}
   */
  async store(user: CreateUsersDto): Promise<User> {
    const newUser = new this.userModel(user);
    const model = await newUser.save();
    const { rta } = model.toJSON();
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
