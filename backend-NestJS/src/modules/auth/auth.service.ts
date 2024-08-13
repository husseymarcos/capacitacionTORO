import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/user.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);

    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    const { password, ...result } = user;
    return result;
  }
}
