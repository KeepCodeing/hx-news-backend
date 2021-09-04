import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { User } from './user/entities/user.entity';
import { Account } from './account/entities/account.entity';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './account/account.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core'

@Module({
  imports: [
    AccountModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '114514',
      database: 'hx-backend',
      entities: [Account, User],
      synchronize: true,
      logging: true
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  }],
})
export class AppModule {}
