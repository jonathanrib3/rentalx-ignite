import { inject, injectable } from "tsyringe";
import bcrypt from "bcrypt";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

interface IRequest {
  name: string;
  password: string;
  email: string;
  driver_license: string;
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  hashPassword(passwordToBeHashed: string): string {
    const hashedPassword = bcrypt.hashSync(passwordToBeHashed, 10);

    return hashedPassword;
  }

  async execute({ name, password, email, driver_license }: IRequest) {
    const hashedPassword = this.hashPassword(password);

    await this.usersRepository.create({
      name,
      password: hashedPassword,
      email,
      driver_license,
    });
  }
}

export { CreateUserUseCase };
