import {
  IsString,
  IsOptional,
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsInt,
  MinLength,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTodoDto {
  @IsInt()
  @IsNotEmpty()
  readonly userId: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  readonly title: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  readonly description?: string;

  @IsBoolean()
  @IsOptional()
  readonly completed?: boolean;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  readonly dueDate?: Date;
}
