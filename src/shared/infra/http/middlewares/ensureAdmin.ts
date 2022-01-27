import { AppError } from "@errors/AppError";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UserRepository";
import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";

async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { user_id } = request.user;

  const usersRepository = container.resolve(UsersRepository);

  const user = await usersRepository.findById(user_id);

  if (!user.admin) {
    throw new AppError(401, "User is not an administrator");
  }

  next();
}

export { ensureAdmin };
