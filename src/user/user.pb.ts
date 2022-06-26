export const USER_PACKAGE_NAME = 'user';
export const User_SERVICE_NAME = 'UserService';
export const protobufPackage = 'user';
import { Observable } from 'rxjs';

export interface CreateUserReq {
  name: string;
  nationalCode: string;
  age: number;
  address: string;
}
export interface CreateUserRes {
  status: number;
  error: string[];
  id: number
}
export interface FindRequest {
  id: number

}
export interface FindOneRes{
  name: string;
  nationalCode: string;
  age: number;
  address: string;
  id: number
}
export interface FindRes {
  data :FindOneRes | undefined
  status: number;
  error: string[];
}
 

export interface RemoveUserReq {
  id: number

}
export interface RemoveUserRes {
  status: number;
  error: string[];
  id: number
}
export interface UpdateUserReq {
  name: string;
  nationalCode: string;
  age: number;
  address: string;
  id: number
}
export interface UpdateUserRes {
  data :FindOneRes | undefined
  status: number;
  error: string[];
} 
export interface FindAllReq {
 
}
export interface FindAllRes {
  data :FindOneRes[] | undefined
  status: number;
  error: string[];
}
export interface UserServiceClient {
  createUser(request: CreateUserReq):   CreateUserRes  ;

  findById(request: FindRequest): FindRes;

  findAll(request: FindAllReq): FindAllRes;

  removeUser(request: RemoveUserReq): RemoveUserRes;

  updateUser(request: UpdateUserReq): UpdateUserRes;

}