import { AppError } from "@errors/AppError";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { CarsTestRepository } from "@modules/cars/repositories/in-memory/CarsTestRepository";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsTestRepository: CarsTestRepository;

describe("Create Car", () => {
  beforeEach(() => {
    carsTestRepository = new CarsTestRepository();
    createCarUseCase = new CreateCarUseCase(carsTestRepository);
  });

  it("should create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Marea 4x4",
      description: "Insanidade total!!",
      brand: "Wolkswagen, Chevrolet, Fiat e Ford",
      daily_rate: 500,
      fine_amount: 10000,
      license_plate: "DMC-6666",
    });
    expect(car).toHaveProperty("id");
  });

  it("should not create a car with same license_plate", () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Logan",
        description: "Sei lá, um sedan??",
        brand: "Renault",
        daily_rate: 500,
        fine_amount: 10000,
        license_plate: "TST-6161",
      });

      await createCarUseCase.execute({
        name: "Saveiro",
        description: "Pickup 4x4",
        brand: "Wolkswagen",
        daily_rate: 50,
        fine_amount: 11000,
        license_plate: "TST-6161",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
