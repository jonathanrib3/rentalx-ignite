import { inject, injectable } from "tsyringe";

import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";

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
