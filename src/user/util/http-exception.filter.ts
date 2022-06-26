// import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException } from '@nestjs/common';
// import { Request, Response } from 'express';

// @Catch(BadRequestException)
// export class BadRequestExceptionFilter implements ExceptionFilter {
//   catch(exception: BadRequestException, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse<Response>();
//     const request = ctx.getRequest<Request>();
//     const status = exception.getStatus();

//     response
//       .status(status)
//       // you can manipulate the response here
//       .json({
//         statusCode: status,
//         timestamp: new Date().toISOString(),
//         path: request.url,
//       });
//   }
// }
import {
    ArgumentsHost, Catch, ExceptionFilter, HttpException,
    HttpStatus
} from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { Request, Response } from 'express';
import { ErrorStatusMapper } from "./ErrorStatusMapper-util";

import { Metadata, status } from '@grpc/grpc-js';

interface CustomExceptionDetails {
    type: string;
    details: string,
    domain: string,
    metadata: { service: string }
}
interface CustomException<T> {
    code: status;
    details: T;
    metadata: Metadata;
}

@Catch(RpcException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: RpcException, host: ArgumentsHost) {
        const err = exception.getError();
        let _exception: CustomException<string>;
        let details: CustomExceptionDetails;

        if (typeof err === 'object') {
            _exception = err as CustomException<string>;
            details = <CustomExceptionDetails>(JSON.parse(_exception.details));
        }

        // **You can log your exception details here**
        // log exception (custom-logger)
        // const loggerService: LoggerService<CustomExceptionDetails> =
        // new LoggerService(FeatureService["CLIENT/UserAccountService"]);

        // loggerService.log(<LogData<CustomExceptionDetails>>{ type: LogType.ERROR, data: details });

        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        // const request = ctx.getRequest<Request>();

        const mapper = new ErrorStatusMapper();
        const status = mapper.grpcToHttpMapper(_exception.code);
        const type = HttpStatus[status];

        response
            .status(status)
            .json({
                statusCode: status,
                message: details.details,
                error: type,
            });
    }
}