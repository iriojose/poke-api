import {
    Catch,
    ExceptionFilter,
    ArgumentsHost,
    Logger,
    HttpStatus,
    HttpException,
  } from '@nestjs/common';
  
@Catch()
export class HttpErrorException implements ExceptionFilter {
    catch(error: Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        let code;
        let message;
    
        Logger.error(`Error: `, JSON.stringify(error));
    
        if (error instanceof HttpException) {
            code = error['status'];
            message = error['response']['error'] ? error['response']['error']: error['message'];
        } else {
            code = HttpStatus.INTERNAL_SERVER_ERROR;
            message = 'Internal Error';
        }
  
        Logger.error(`Error message: `, error.message);
    
        const errorResponse = {
            code,
            message: message,
        };
      
        response.status(HttpStatus.OK).json(errorResponse);
    }  
}
  