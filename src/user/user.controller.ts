/**
 * @namespace user
 */
import { Body, Controller, Delete, Get, Inject, OnModuleInit, Param, ParseIntPipe, Post, Put, Query, UsePipes, UseInterceptors, ValidationPipe, UseFilters, HttpException, HttpStatus } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  CreateUserReq,
  CreateUserRes,
  FindAllReq,
  FindAllRes,
  FindRequest,
  FindRes,
  RemoveUserReq,
  RemoveUserRes,
  UpdateUserReq,
  UpdateUserRes,
  UserServiceClient,
  User_SERVICE_NAME
} from './user.pb';
import { Observable } from 'rxjs';
//import { HttpExceptionFilter } from '../util/http-exception.filter';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


/**
  * @class UserController  
  * @memberof user
  * @description کلاس کنترلر مربوط به عملیات کراد برای مدیریت کاربران در گیت وی
  */
@Controller('user')
export class UserController implements OnModuleInit {
  private userServiceClient: UserServiceClient;

  @Inject(User_SERVICE_NAME)
  private readonly client: ClientGrpc; 

  public onModuleInit(): void {
    this.userServiceClient = this.client.getService<UserServiceClient>(User_SERVICE_NAME);
  }

  /**
   * @typedef CreateUserReq
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
   * @memberof user.UserController
   * @summary متد ایجاد کاربر جدید
   * @param {CreateUserReq}body ورودی برای ایجاد کاربر جدید
   * @returns User
   */
  @Post()
  //@UseFilters(new HttpExceptionFilter())
  create(@Body() body: CreateUserDto):CreateUserRes {
   
    return this.userServiceClient.createUser(body);
 
  }
  /**
     * @typedef FindOne
     * @param {string} name   
     * @param {string} nationalCode   
     * @param {number} age   
     * @param {string} address   
     */
  /**
     * @typedef FindRes
     * @param {FindOne} data   
     * @param {number} status   
     * @param {Array} error   
     */
  /**
    * @typedef FindAllRes
    * @param {FindOne[]} data   
    * @param {number} status   
    * @param {Array} error   
    */

  /**
    * @memberof user.UserController
    * @summary متد دریافت اطلاعات کاربر با استفاده از شناسه  
    * @param {number}id شناسه کاربر 
    * @returns FindRes
    */
  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number): FindRes {
    return this.userServiceClient.findById({ id });

  }

  /**
     * @memberof user.UserController
     * @summary متد دریافت اطلاعات کاربر    
     * @returns FindAllRes
     */
  @Get()
  findAll(): FindAllRes {
    return this.userServiceClient.findAll({});
  }
  /**
     * @typedef RemoveUserRes
     * @param {number} id   
     * @param {number} status   
     * @param {Array} error   
     */
  /**
    * @memberof user.UserController
    * @summary متد حذف اطلاعات کاربر با استفاده از شناسه  
    * @param {string}id شناسه کاربر 
    * @returns RemoveUserRes
    */
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): RemoveUserRes {
    return this.userServiceClient.removeUser({ id });
  }

  /**
    * @memberof user.UserController
    * @summary متد ویرایش اطلاعات کاربر با استفاده از شناسه  
    * @param {string}id شناسه کاربر 
    * @param {CreateUserReq}body اطلاعات ویرایش شده کاربر 
    * @returns FindRes
    */
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateUserDto): UpdateUserRes {
    return this.userServiceClient.updateUser(
      {
        id: id,
        name: body.name,
        age: body.age,
        nationalCode: body.nationalCode,
        address: body.address
      });
  }

}

