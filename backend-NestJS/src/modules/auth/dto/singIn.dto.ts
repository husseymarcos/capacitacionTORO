import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class SignInDto {
  @IsEmail({}, { message: 'Email must be a valid email address' })
  @IsNotEmpty({ message: 'Please enter an email address' })
  email: string;

  @IsString({ message: 'Insert a valid password' })
  @IsNotEmpty({ message: 'Password should not be empty' })
  password: string;
}
