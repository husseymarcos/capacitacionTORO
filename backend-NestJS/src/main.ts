import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Sequelize } from 'sequelize-typescript';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  const port = 3001;

  const sequelize = app.get<Sequelize>(Sequelize);

  await sequelize
    .sync()
    .then(() => console.log('Database & tables synchronized'))
    .catch((err) => console.error('Error synchronizing database:', err));

  await app.listen(port);
}
bootstrap();
