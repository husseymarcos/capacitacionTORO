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
import { identity } from 'rxjs';

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

    const user = new User(createUserDto);
    return await this.userRepository.create(user);
  }

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findByEmail(email);
    console.log("User: " + user)

    const userPassword = user?.password;

    if (userPassword !== pass) {
      throw new UnauthorizedException();
    }

    console.log(user.id)
    console.log(user.get('id'))
    console.log(user.getDataValue('id'))


    const payload = { id: user.get('id'), email: user.email };

    console.log('Signing in with payload:', payload);

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
