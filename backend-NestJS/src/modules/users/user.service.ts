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
    const { name, lastName, email, password } = createUserDto;
    const user = new User();
    user.name = name;
    user.lastName = lastName;
    user.email = email;
    user.password = password;
    return await this.usersRepository.create(user);
  }
}
