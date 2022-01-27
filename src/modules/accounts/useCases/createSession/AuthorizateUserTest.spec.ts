import { AppError } from "@shared/infra/errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UserTestRepository } from "@modules/accounts/repositories/implementations/UserTestRepository";
import { CreateUserUseCase } from "@modules/accounts/useCases/createUser/CreateUserUseCase";
import { AuthorizateUserUseCase } from "./AuthorizateUserUseCase";

let userTestRepository: UserTestRepository;
let createUserUseCase: CreateUserUseCase;
let authorizateUserUseCase: AuthorizateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    userTestRepository = new UserTestRepository();
    createUserUseCase = new CreateUserUseCase(userTestRepository);
    authorizateUserUseCase = new AuthorizateUserUseCase(userTestRepository);
  });

  it("should authenticate an existent user", async () => {
    const newUser: ICreateUserDTO = {
      name: "SAMPLE TEXT",
      email: "sadtrollface@gmail.com",
      password: "areallystrongpassword1234",
      driver_license: "666-666-666",
    };

    await createUserUseCase.execute({
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
      driver_license: newUser.driver_license,
    });

    const authToken = await authorizateUserUseCase.execute({
      email: newUser.email,
      password: newUser.password,
    });

    expect(authToken).toHaveProperty("token");
  });

  it("should not be able to authenticate a user that doesn't exists", async () => {
    expect(async () => {
      const fakeUser: ICreateUserDTO = {
        name: "SAMPLE TEXT",
        email: "sadtrollface@gmail.com",
        password: "areallystrongpassword1234",
        driver_license: "666-666-666",
      };

      await authorizateUserUseCase.execute({
        email: fakeUser.email,
        password: fakeUser.password,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate a user passing a wrong password", () => {
    expect(async () => {
      const newUser: ICreateUserDTO = {
        name: "SAMPLE TEXT",
        email: "sadtrollface@gmail.com",
        password: "areallystrongpassword1234",
        driver_license: "666-666-666",
      };

      await createUserUseCase.execute({
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        driver_license: newUser.driver_license,
      });

      await authorizateUserUseCase.execute({
        email: newUser.email,
        password: "anyotherpassword1234",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
