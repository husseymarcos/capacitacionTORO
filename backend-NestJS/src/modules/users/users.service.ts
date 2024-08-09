import { Inject, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './createUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
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
