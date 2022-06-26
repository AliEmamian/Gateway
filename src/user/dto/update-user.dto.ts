import { IsDefined, IsNumber, IsNumberString, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
export class UpdateUserDto {
  //@IsNumber()
  //id: number;
  @IsString()
  @MinLength(3, {
    message: 'name must be greater than 3 char!',
  })
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsDefined()
  nationalCode?: string;

  @IsOptional()
  @IsNumberString()
  age?: number;

  @MinLength(10, {
    message: 'address must be greater than 10 char',
  })
  @MaxLength(50, {
    message: 'address is too long',
  })
  @IsOptional()
  address?: string;
}