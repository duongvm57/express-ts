/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import HttpException from '../common/http-exception';
import logger from '../common/logger';

const errorHandler = (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 500;
  const errorMessage = (
    err instanceof Prisma.PrismaClientInitializationError || 
    err instanceof Prisma.PrismaClientKnownRequestError ||
    err instanceof Prisma.PrismaClientUnknownRequestError ||
    err instanceof Prisma.PrismaClientRustPanicError ||
    err instanceof Prisma.PrismaClientValidationError
  ) ? err : err.message;
  logger.error(err.message);
  res.status(status).json({
    status: status,
    message: errorMessage
  });
};

export { errorHandler };