import { IsDefined, IsNumber, IsNumberString, IsString, MaxLength, MinLength } from 'class-validator';
export class FindIdUserDto {

  @IsNumber()
  id: number;

}