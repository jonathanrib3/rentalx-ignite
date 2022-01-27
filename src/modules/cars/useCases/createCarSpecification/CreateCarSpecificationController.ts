import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

class CreateCarSpecificationController {
  async handle(request: Request, response: Response) {
    const { car_id } = request.params;
    const { specifications_ids } = request.body;

    const createCarSpecificationUseCase = container.resolve(
      CreateCarSpecificationUseCase
    );

    const car_specification = await createCarSpecificationUseCase.execute({
      car_id,
      specifications_ids,
    });

    return response.status(201).json(car_specification);
  }
}

export { CreateCarSpecificationController };
