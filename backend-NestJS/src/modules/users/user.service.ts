import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './createUser.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private usersRepository: typeof User,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = new User(createUserDto);
    return await this.usersRepository.create(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }
}
