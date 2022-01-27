import { AppError } from "@errors/AppError";
import { ICarsImagesRepository } from "@modules/cars/repositories/ ICarImagesRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  car_id: string;
  images_names: string[];
}

@injectable()
class UploadCarsImagesUseCase {
  constructor(
    @inject("CarsImagesRepository")
    private carImagesRepository: ICarsImagesRepository,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute({ car_id, images_names }: IRequest) {
    const carExists = await this.carsRepository.findById(car_id);

    if (!carExists) {
      throw new AppError(400, "Car doesn't exists");
    }

    await images_names.forEach(async (image_name) => {
      await this.carImagesRepository.create({
        car_id,
        image_name,
      });
    });
  }
}

export { UploadCarsImagesUseCase };
