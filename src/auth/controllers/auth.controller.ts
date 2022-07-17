import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { ApiOperation, ApiTags, ApiBody} from "@nestjs/swagger";
import { AuthDtos } from '../dtos/auth.dtos';

/**
* Controlador del módulo de Auth
* @author Duvan Manzano. - jhorman980815@gmail.com
* @copyright Duvan 2022
*/
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * Metodo para Inicia sesión
   * @param {Request<AuthDtos>} req
   * @returns {Promise<object>}
   */
  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOperation({ summary: 'Log in'})
  @ApiBody({ type: AuthDtos })
  async login(@Request() req): Promise<object> {
    return this.authService.generateJWT(req.user);
  }
}
