import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private usersRepository: typeof User,
  ) {}

  async findByEmail(emailToFind: string): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: {
        email: emailToFind,
      },
    });
  }

  async findById(userId: number): Promise<User | null> {
    return this.usersRepository.findByPk(userId);
  }
}
