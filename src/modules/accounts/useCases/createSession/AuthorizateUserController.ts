import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthorizateUserUseCase } from "./AuthorizateUserUseCase";

class AuthorizateUserController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    const authorizateUserUseCase = container.resolve(AuthorizateUserUseCase);

    const token = await authorizateUserUseCase.execute({ email, password });

    if (!token) {
      return response.status(401).json("User not authenticated");
    }

    return response.status(200).json(token);
  }
}

export { AuthorizateUserController };
