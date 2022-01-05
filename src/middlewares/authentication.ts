import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import "dotenv/config";
import { container } from "tsyringe";

import { AppError } from "../AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UserRepository";

interface IPayload {
  sub: string;
}

async function authentication(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { authorization } = request.headers;

  const [, token] = authorization.split(" ");

  try {
    const { sub } = verify(token, process.env.JWT_SECRET) as IPayload;

    const usersRepository = container.resolve(UsersRepository);

    const user = await usersRepository.findById(sub);

    if (!user) {
      throw new AppError(401, "User does not exists");
    }

    request.user = {
      user_id: sub,
    };

    next();
  } catch (err) {
    throw new AppError(401, "Invalid token");
  }
}

export { authentication };
