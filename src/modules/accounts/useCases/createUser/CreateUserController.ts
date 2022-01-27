import { AppError } from "@shared/infra/errors/AppError";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(request: Request, response: Response) {
    if (!request.body) {
      throw new AppError(400, "Cannot create user from empty body");
    }

    const { name, password, email, driver_license } = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    await createUserUseCase.execute({ name, password, email, driver_license });

    return response.status(201).json("Created");
  }
}

export { CreateUserController };
