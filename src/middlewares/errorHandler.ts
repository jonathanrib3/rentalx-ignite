import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import { QueryFailedError } from "typeorm";
import { AppError } from "../AppError";

const errorHandler: ErrorRequestHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    return response.status(error.status).json(error.message);
  }

  if (error instanceof QueryFailedError) {
    return response.status(400).json(error.message);
  }

  if (error instanceof JsonWebTokenError) {
    return response.status(401).json(error.message);
  }

  return response.status(500).json("Sorry, something went wrong on the server");
};

export { errorHandler };
