import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../AppError";
import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: CategoriesRepository
  ) {}

  async execute({ description, name }: IRequest) {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name
    );

    if (categoryAlreadyExists) {
      throw new AppError(400, "Category already exists!");
    }

    await this.categoriesRepository.create({ name, description });
  }
}

export default CreateCategoryUseCase;
