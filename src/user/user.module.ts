import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {UserController} from './user.controller'
//import {UserService} from './user.service'
import { USER_PACKAGE_NAME, User_SERVICE_NAME } from './user.pb';
import { ConfigModule } from '@nestjs/config'

@Module({
    imports: [
      ConfigModule.forRoot(),
      ClientsModule.register([
          {
            name: User_SERVICE_NAME,
            transport: Transport.GRPC,
            options: {
              url: process.env.USER_MICROSERVICE_URL,
              package: USER_PACKAGE_NAME,
              protoPath: 'src/user/user.proto',
            },
          },
        ]),
      ],
      controllers: [UserController],
    //providers: [UserService],
})
export class UserModule {}
