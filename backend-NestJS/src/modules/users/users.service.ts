import { Inject, Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UsersService {

    constructor(
        @Inject('USERS_REPOSITORY')
        private usersRepository: typeof User
    ) {}

    async findAll(): Promise<User[]> {
        return this.usersRepository.findAll<User>();
    }

}