import { IsString, IsEmail, IsNotEmpty, Length } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @Length(3, 20)
    username: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @Length(6, 100)
    password: string;
}
