import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthService } from './modules/auth/auth.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadModels: true, 
      synchronize: true,    
      ssl: true,            
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false, 
        },
      },
      logging: console.log, 
      models: [],       
    }),
    UsersModule,
    AuthModule,
  ],
  providers: [AuthService],
})
export class AppModule {}
