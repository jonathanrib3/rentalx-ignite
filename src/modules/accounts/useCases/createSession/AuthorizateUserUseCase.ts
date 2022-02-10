import { AppError } from "@shared/infra/errors/AppError";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import "@root/config.js";

interface IRequest {
  email: string;
  password: string;
}

interface ITokenPayload {
  id: string;
  admin: boolean;
  created_at: string;
}

@injectable()
class AuthorizateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError(400, "Email or password invalid!");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError(400, "Email or password invalid!");
    }

    const tokenPayload: ITokenPayload = {
      id: user.id,
      admin: user.admin,
      created_at: Date(),
    };

    const token = sign(tokenPayload, process.env.JWT_SECRET, {
      subject: user.id,
      expiresIn: "1d",
    });

    return {
      token,
    };
  }
}

export { AuthorizateUserUseCase };
