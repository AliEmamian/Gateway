import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/Get-user.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AppService {
  private Users: User[] = [];

  createUser(userObj: CreateUserDto): User {
    const { name, nationalCode, age, address } = userObj;
    const user: User = {
      id: uuid(),
      name,
      nationalCode,
      age,
      address
    };
    this.Users.push(user);
    return user;
  }

  findAll(): User[] {
    return this.Users;
  }

  findById(id: string): User {
    return this.Users.find((user) => user.id == id);
  }

  find(userObj: GetUserDto): User[] {
    console.log(userObj)
    let users = this.findAll();
    const {
      name,
      nationalCode,
      age,
      address 
    } = userObj;

    if (name) {
      users = users.filter((user) =>
        user.name.toLowerCase().includes(name),
      );
    }
    if (nationalCode) {
      users = users.filter((user) =>
        user.nationalCode.toLowerCase().includes(nationalCode),
      );
    }
    if (age) {
      users = users.filter((user) =>
        user.age = age,
      );
    }
    if (address) {
      users = users.filter((user) =>
        user.address.toLowerCase().includes(address),
      );
    }
    return users;

  }
  removeUser(id:string):User{
    const user =this.findById(id);
    if(user){
      this.Users = this.Users.filter((bookmark) => bookmark.id !== id);
      return user;
    }
    throw new BadRequestException('Invalid user');;
  }

  updateUser(id:string, userObj:GetUserDto){
    const user = this.findById(id);
    const {
      name,
      nationalCode,
      age,
      address 
    } = userObj;
    if(name) user.name =name;
    if(nationalCode) user.nationalCode =nationalCode;
    if(age) user.age =age;
    if(address) user.address =address;
    return user;
  }
}
