import { AppError } from "@errors/AppError";
import { UserTestRepository } from "@modules/accounts/repositories/implementations/UserTestRepository";
import { CarsTestRepository } from "@modules/cars/repositories/in-memory/CarsTestRepository";
import { RentalsTestRepository } from "@modules/rentals/repositories/in-memory/RentalsTestRepository";
import { DayjsDateProvider } from "@shared/containers/providers/implementations/DayjsDateProvider";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let rentalsTestRepository: RentalsTestRepository;
let carsTestRepository: CarsTestRepository;
let usersTestRepository: UserTestRepository;
let createRentalUseCase: CreateRentalUseCase;
let dayjsProvider: DayjsDateProvider;

describe("Create Rental", () => {
  beforeEach(() => {
    rentalsTestRepository = new RentalsTestRepository();
    carsTestRepository = new CarsTestRepository();
    usersTestRepository = new UserTestRepository();
    dayjsProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsTestRepository,
      carsTestRepository,
      usersTestRepository,
      dayjsProvider
    );
  });

  it("should create a new rental with valid infos", () => {
    expect(async () => {
      const car = await carsTestRepository.create({
        name: "Logan",
        description: "I dont know",
        brand: "Renault",
        daily_rate: 500,
        fine_amount: 5,
        license_plate: "TST-6161",
      });

      const user = await usersTestRepository.create({
        name: "apyr",
        email: "rypa@gmail.com",
        password: "pripyat",
        driver_license: "777-777-777",
      });

      const rental = await createRentalUseCase.execute({
        car_id: car.id,
        user_id: user.id,
        expected_return_date: new Date("2022-02-20"),
      });

      expect(rental.id).toBeDefined();
    });
  });

  it("should not be able to create a new rental with invalid car id", async () => {
    expect(async () => {
      const user1 = await usersTestRepository.create({
        name: "SAMPLE TEXT",
        email: "sadtrollface@gmail.com",
        password: "areallystrongpassword1234",
        driver_license: "666-666-666",
      });

      await createRentalUseCase.execute({
        car_id: "any invalid id",
        user_id: user1.id,
        expected_return_date: new Date(),
      });
    }).rejects.toEqual(new AppError(400, "Car doesn't exists"));
  });

  it("should not be able to create a new rental with invalid user id", async () => {
    expect(async () => {
      const car1 = await carsTestRepository.create({
        name: "Marea 4x4",
        description: "Insanidade total!!",
        brand: "Wolkswagen, Chevrolet, Fiat e Ford",
        daily_rate: 500,
        fine_amount: 10000,
        license_plate: "DMC-6666",
      });

      await createRentalUseCase.execute({
        car_id: car1.id,
        user_id: "any invalid id",
        expected_return_date: new Date(),
      });
    }).rejects.toEqual(new AppError(400, "User doesn't exists"));
  });

  it("should not be able to create a new rental with an already rented car", async () => {
    expect(async () => {
      const car2 = await carsTestRepository.create({
        name: "Marea 4x4",
        description: "Insanidade total!!",
        brand: "Wolkswagen, Chevrolet, Fiat e Ford",
        daily_rate: 500,
        fine_amount: 10000,
        license_plate: "DMC-6666",
      });

      const user2 = await usersTestRepository.create({
        name: "any name, whatever",
        email: "whatever@gmail.com",
        password: "areallystrongpassword4321",
        driver_license: "333-333-333",
      });

      await createRentalUseCase.execute({
        car_id: car2.id,
        user_id: user2.id,
        expected_return_date: new Date("2022-12-30"),
      });

      await createRentalUseCase.execute({
        car_id: car2.id,
        user_id: user2.id,
        expected_return_date: new Date("2022-12-30"),
      });
    }).rejects.toEqual(new AppError(400, "This car is already being rented"));
  });

  it("should not create a new rental using an user which already has an open one", async () => {
    await expect(async () => {
      const car3 = await carsTestRepository.create({
        name: "Any car, whatever",
        description: "Mehhhhhhhhhhhhhh",
        brand: "B0r3d",
        daily_rate: 100,
        fine_amount: 1,
        license_plate: "TST-5066",
      });

      const car4 = await carsTestRepository.create({
        name: "Any car, whatever again",
        description: "Mehhhhhhhhhhhhhhhh",
        brand: "B0r3d",
        daily_rate: 100,
        fine_amount: 1,
        license_plate: "TST-5067",
      });

      const user2 = await usersTestRepository.create({
        name: "any name again, whatever",
        email: "whateveragain@gmail.com",
        password: "areallystrongpassword1324",
        driver_license: "111-111-111",
      });

      await createRentalUseCase.execute({
        car_id: car3.id,
        user_id: user2.id,
        expected_return_date: new Date("2022-12-31"),
      });

      await createRentalUseCase.execute({
        car_id: car4.id,
        user_id: user2.id,
        expected_return_date: new Date("2022-12-21"),
      });
    }).rejects.toEqual(
      new AppError(400, "The user already has an open rental")
    );
  });

  it("should not be able to create a new rent with an invalid return date", async () => {
    await expect(async () => {
      const car5 = await carsTestRepository.create({
        name: "FINALLY THE LAST UNIT TEST FOR THIS FEATURE",
        description: "yeeeeeeeeeeeSSSSSS",
        brand: "B0r3d",
        daily_rate: 200,
        fine_amount: 66,
        license_plate: "TST-5068",
      });

      const user3 = await usersTestRepository.create({
        name: "barack obama",
        email: "obama@gmail.com",
        password: "isthisajoke?mayb1324",
        driver_license: "000-000-000",
      });

      await createRentalUseCase.execute({
        car_id: car5.id,
        user_id: user3.id,
        expected_return_date: new Date(),
      });
    }).rejects.toEqual(
      new AppError(400, "Expected return date lesser than 24 hours")
    );
  });
});
