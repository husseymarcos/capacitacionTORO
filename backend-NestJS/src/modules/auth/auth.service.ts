import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { User } from '../users/user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { validate } from 'class-validator';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    @InjectModel(User)
    private userRepository: typeof User,
  ) {}

  async register(createUserDto: RegisterDto): Promise<User> {
    const errors = await validate(createUserDto);
    if (errors.length > 0) {
      const errorMessages = errors
        .map((err) => Object.values(err.constraints))
        .flat();
      throw new BadRequestException({ errors: errorMessages });
    }

    const existingUser = await this.usersService.findByEmail(
      createUserDto.email,
    );
    if (existingUser) {
      throw new ConflictException('Email is already registered');
    }

    return await this.userRepository.create(createUserDto);
  }

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findByEmail(email);
    const userPassword = user?.password;

    if (userPassword !== pass) {
      throw new UnauthorizedException();
    }

    const payload = { userId: user.id, email: user.email };

    console.log('Signing in with payload:', payload);

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
