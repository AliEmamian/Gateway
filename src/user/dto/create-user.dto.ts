import { IsDefined, IsNumber, IsNumberString, IsString, MaxLength, MinLength } from 'class-validator';
export class CreateUserDto {
  @IsString()
  @MinLength(3, {
    message: 'name must be greater than 3 char!',
  })
  name: string;

  @IsDefined()
  nationalCode: string;

  @IsNumberString()
  age: number;

  @MinLength(10, {
    message: 'address must be greater than 10 char',
  })
  @MaxLength(50, {
    message: 'address is too long',
  })
  address: string;
}