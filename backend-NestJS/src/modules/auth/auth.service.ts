import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from '../users/register.dto';
import { User } from '../users/user.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    @InjectModel(User)
    private userRepository: typeof User,
  ) {}

  async register(createUserDto: RegisterDto): Promise<User> {
    const user = new User(createUserDto);
    return await this.userRepository.create(user);
  }

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findByEmail(email);

    const userPassword = user?.password;

    if (userPassword !== pass) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
