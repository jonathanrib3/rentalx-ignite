import { inject, injectable } from "tsyringe";

import { SpecificationsRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationsRepository";

@injectable()
class ListSpecificationsUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: SpecificationsRepository
  ) {}

  async execute() {
    const foundList = await this.specificationsRepository.list();

    return foundList;
  }
}

export { ListSpecificationsUseCase };
