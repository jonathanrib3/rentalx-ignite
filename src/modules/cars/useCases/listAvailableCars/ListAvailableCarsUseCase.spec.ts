import { CarsTestRepository } from "@modules/cars/repositories/in-memory/CarsTestRepository";
import { CreateCarUseCase } from "../createCar/CreateCarUseCase";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let carsTestRepository: CarsTestRepository;
let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let createCarUseCase: CreateCarUseCase;

describe("List Cars", () => {
  beforeEach(() => {
    carsTestRepository = new CarsTestRepository();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsTestRepository);
    createCarUseCase = new CreateCarUseCase(carsTestRepository);
  });

  it("should be able to list all available cars", async () => {
    const car = await createCarUseCase.execute({
      name: "Test Car n1",
      brand: "Test Brand",
      description: "Testing Car n1",
      daily_rate: 50,
      fine_amount: 10000,
      license_plate: "TST-6050",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to filter available cars by name", async () => {
    const car2 = await createCarUseCase.execute({
      name: "Test Car n2",
      brand: "Test Brand",
      description: "Testing Car n2",
      daily_rate: 50,
      fine_amount: 15000,
      license_plate: "TST-6060",
    });

    await createCarUseCase.execute({
      name: "Test Car n3",
      brand: "Test Brand",
      description: "Testing Car n3",
      daily_rate: 50,
      fine_amount: 20000,
      license_plate: "TST-6070",
    });

    const cars = await listAvailableCarsUseCase.execute({ name: car2.name });

    expect(cars).toEqual([car2]);
  });

  it("should be able to filter available cars by brand", async () => {
    const car4 = await createCarUseCase.execute({
      name: "Test Car n4",
      brand: "Test Brand",
      description: "Testing Car n4",
      daily_rate: 50,
      fine_amount: 25000,
      license_plate: "TST-6080",
    });

    await createCarUseCase.execute({
      name: "Lexus UX 250h",
      brand: "Lexus",
      description: "Top tier car",
      daily_rate: 50,
      fine_amount: 30000,
      license_plate: "TST-7058",
    });

    const cars = await listAvailableCarsUseCase.execute({ brand: car4.brand });

    expect(cars).toEqual([car4]);
  });

  it("should be able to filter available cars by category_id", async () => {
    const car5 = await createCarUseCase.execute({
      name: "Test Car n5",
      brand: "Test Brand",
      description: "Testing Car n5",
      daily_rate: 50,
      fine_amount: 35000,
      license_plate: "TST-6090",
    });

    const car6 = await createCarUseCase.execute({
      name: "Test Car n6",
      brand: "Test Brand",
      description: "Testing Car n6",
      daily_rate: 50,
      fine_amount: 40000,
      license_plate: "TST-7000",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: undefined,
    });

    expect(cars).toEqual([car5, car6]);
  });
});
