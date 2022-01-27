import { AppError } from "@errors/AppError";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  car_id: string;
  specifications_ids: string[];
}

@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute({ car_id, specifications_ids }: IRequest) {
    const car = await this.carsRepository.findById(car_id);

    if (!car) {
      throw new AppError(400, "Car doesn't exists");
    }

    const specifications = await this.specificationsRepository.findByIds(
      specifications_ids
    );

    car.specifications = specifications;

    return car;
  }
}

export { CreateCarSpecificationUseCase };
