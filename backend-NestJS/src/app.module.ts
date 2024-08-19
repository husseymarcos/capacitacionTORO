import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './modules/users/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { User } from './modules/users/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { TodoModule } from './modules/todo/todo.module';
import { Todo } from './modules/todo/todo.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET_KEY'),
        signOptions: { expiresIn: '2 days' },
      }),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'postgres',
      ssl: false,
      models: [User, Todo],
      autoLoadModels: true,
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    TodoModule,
  ],
  providers: [],
})
export class AppModule {}
