import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

class UserTestRepository implements IUsersRepository {
  private users: User[] = [];

  async create({
    name,
    password,
    email,
    driver_license,
    id,
    avatar,
  }: ICreateUserDTO) {
    const newUser = new User();

    Object.assign(newUser, {
      name,
      password,
      email,
      driver_license,
    });

    await this.users.push(newUser);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.users.find((user) => user.email === email);

    return user;
  }
  async findById(id: string): Promise<User> {
    const user = await this.users.find((user) => user.id === id);

    return user;
  }
}

export { UserTestRepository };
