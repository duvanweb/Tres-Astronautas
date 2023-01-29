import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const { user, password, dbName, host, connection } = configService.get('mongo')
        return {
          uri: `${connection}://${host}`,
          user,
          pass: password,
          dbName,
        }
      },
      inject: [ConfigService],
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
