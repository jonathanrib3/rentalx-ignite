import { AppError } from "@errors/AppError";
import { CarsTestRepository } from "@modules/cars/repositories/in-memory/CarsTestRepository";
import { SpecificationsTestRepository } from "@modules/cars/repositories/in-memory/SpecificationsTestRepository";
import { CreateCarUseCase } from "../createCar/CreateCarUseCase";
import { CreateSpecificationUseCase } from "../createSpecification/CreateSpecificationUseCase";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let carsTestRepository: CarsTestRepository;
let specificationsTestRepository: SpecificationsTestRepository;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let createCarUseCase: CreateCarUseCase;
let createSpecificationUseCase: CreateSpecificationUseCase;

describe("Create CarSpecification", () => {
  beforeEach(() => {
    carsTestRepository = new CarsTestRepository();
    specificationsTestRepository = new SpecificationsTestRepository();
    createCarUseCase = new CreateCarUseCase(carsTestRepository);
    createSpecificationUseCase = new CreateSpecificationUseCase(
      specificationsTestRepository
    );
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsTestRepository,
      specificationsTestRepository
    );
  });

  it("should add one or more new specifications to an existing car", async () => {
    const car = await createCarUseCase.execute({
      name: "Marea 4x4",
      description: "Insanidade total!!",
      brand: "Wolkswagen, Chevrolet, Fiat e Ford",
      daily_rate: 500,
      fine_amount: 10000,
      license_plate: "DMC-6666",
    });

    const specification1 = await createSpecificationUseCase.execute({
      name: "Off-Road",
      description: "SAMPLE TEXT",
    });

    const specification2 = await createSpecificationUseCase.execute({
      name: "Pickup",
      description: "SAMPLE TEXT2",
    });

    const car_specification = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_ids: [specification1.id, specification2.id],
    });

    console.log(car_specification);

    expect(car_specification.specifications).toEqual([
      specification1,
      specification2,
    ]);
  });

  it("should not add a new specification to an non-existent car", async () => {
    expect(async () => {
      await createCarSpecificationUseCase.execute({
        car_id: "invalid id",
        specifications_ids: ["valid id"],
      });
    }).rejects.toEqual(new AppError(400, "Car doesn't exists"));
  });
});
