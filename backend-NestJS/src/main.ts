import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Sequelize } from 'sequelize-typescript';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const sequelize = app.get<Sequelize>(Sequelize);

  await sequelize
    .sync({ alter: true })
    .then(() => console.log('Database & tables synchronized'))
    .catch((err) => console.error('Error synchronizing database:', err));

  await app.listen(3000);
}
bootstrap();
