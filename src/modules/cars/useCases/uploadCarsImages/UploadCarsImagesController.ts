import { Request, Response } from "express";
import { container } from "tsyringe";
import { UploadCarsImagesUseCase } from "./UploadCarsImagesUseCase";

interface IFiles {
  filename: string;
}

class UploadCarsImagesController {
  async handle(request: Request, response: Response) {
    const { car_id } = request.params;
    const images = request.files as IFiles[];

    const uploadCarsImagesUseCase = container.resolve(UploadCarsImagesUseCase);

    const images_names = images.map((image) => image.filename);

    await uploadCarsImagesUseCase.execute({
      car_id,
      images_names,
    });

    return response.status(201).send();
  }
}

export { UploadCarsImagesController };
