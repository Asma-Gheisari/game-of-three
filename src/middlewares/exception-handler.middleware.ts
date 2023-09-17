import { NextFunction, Request, Response } from "express";
const httpStatus = require('http-status-codes');

export class ExceptionHandlerMiddleware {
  static handle(
    error: Error,
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    console.error(error); 
    response.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error",
    });
  }
}
