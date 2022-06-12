import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { AppService } from './app.service';
import {User} from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';

@Controller('user')
export class AppController {
  constructor(private readonly appService: AppService) {}

  

  @Post()
  createUser(@Body() userObj:CreateUserDto):User {
    return this.appService.createUser(userObj);
  }


  @Get()
  find(@Query() userObj: GetUserDto): User[] {
    console.log(Object.keys(userObj))
    if (Object.keys(userObj).length) {
      return this.appService.find(userObj);
    }
    return this.appService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): User{
    return this.appService.findById(id);
  }

  @Delete(':id')
  removeUser(@Param('id') id: string): User{
    return this.appService.removeUser(id);        
  }

  @Put(':id')
  updateUser(@Param('id') id: string,@Body() userObj: GetUserDto): User {
    return this.appService.updateUser(id, userObj);
  }
  
}
