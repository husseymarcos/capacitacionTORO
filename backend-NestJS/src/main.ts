import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Sequelize } from 'sequelize-typescript';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http:localhost:3001',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  });

  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;

  const sequelize = app.get<Sequelize>(Sequelize);

  await sequelize
    .sync({ alter: true })
    .then(() => console.log('Database & tables synchronized'))
    .catch((err) => console.error('Error synchronizing database:', err));

  await app.listen(port);
}
bootstrap();
