/**
 * @namespace user
 */
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';

/**
  * @class AppController  
  * @memberof user
  * @description کلاس کنترلر مربوط به عملیات کراد برای مدیریت کاربران در گیت وی
  */
@Controller('user')
export class AppController {
  constructor(private readonly appService: AppService) { }

  /**
   * @typedef CreateUserDto
   * @param {string} name   
   * @param {string} nationalCode   
   * @param {number} age   
   * @param {string} address   
   */
  /**
  * @typedef User
  * @param {string} id   
  * @param {string} name   
  * @param {string} nationalCode   
  * @param {number} age   
  * @param {string} address   
  */
  /**
   * @memberof user.AppController
   * @summary متد ایجاد کاربر جدید
   * @param {CreateUserDto}userObj ورودی برای ایجاد کاربر جدید
   * @returns User
   */
  @Post()
  createUser(@Body() userObj: CreateUserDto): User {
    return this.appService.createUser(userObj);
  }
  /**
     * @typedef GetUserDto
     * @param {string} name   
     * @param {string} nationalCode   
     * @param {number} age   
     * @param {string} address   
     */
  /**
    * @memberof user.AppController
    * @summary متد دریافت اطلاعات کاربر    
    * @param {GetUserDto}userObj ورودی برای دریافت کاربر 
    * @returns User[]
    */
  @Get()
  find(@Query() userObj: GetUserDto): User[] {
    console.log(Object.keys(userObj))
    if (Object.keys(userObj).length) {
      return this.appService.find(userObj);
    }
    return this.appService.findAll();
  }

  /**
    * @memberof user.AppController
    * @summary متد دریافت اطلاعات کاربر با استفاده از شناسه  
    * @param {string}id شناسه کاربر 
    * @returns User
    */
  @Get(':id')
  findById(@Param('id') id: string): User {
    return this.appService.findById(id);
  }

  /**
    * @memberof user.AppController
    * @summary متد حذف اطلاعات کاربر با استفاده از شناسه  
    * @param {string}id شناسه کاربر 
    * @returns User
    */  
  @Delete(':id')
  removeUser(@Param('id') id: string): User {
    return this.appService.removeUser(id);
  }

  /**
    * @memberof user.AppController
    * @summary متد ویرایش اطلاعات کاربر با استفاده از شناسه  
    * @param {string}id شناسه کاربر 
    * @param {GetUserDto}userObj اطلاعات ویرایش شده کاربر 
    * @returns User
    */
  @Put(':id')
  updateUser(@Param('id') id: string, @Body() userObj: GetUserDto): User {
    return this.appService.updateUser(id, userObj);
  }

}
