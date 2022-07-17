import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './services/auth.service';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './strategies/local.strategy';
import { jwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './controllers/auth.controller';
import { ConfigService } from '@nestjs/config';


@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('jwtSecret'),
          signOptions: { expiresIn: '1d' }
        }
      },
    })
  ],
  providers: [AuthService, LocalStrategy, jwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
