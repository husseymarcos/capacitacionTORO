import {
  Body,
  Controller,
  Post,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/singIn.dto';
import { SetMetadata } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { User } from '../users/user.entity';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/register')
  async register(@Body() createUserDto: RegisterDto): Promise<User> {
    try {
      return await this.authService.register(createUserDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Public()
  @Post('/login')
  signIn(@Body() signInDto: SignInDto) {

    const email = signInDto.email;
    const password = signInDto.password

    return this.authService.signIn(email, password);
  }
}
