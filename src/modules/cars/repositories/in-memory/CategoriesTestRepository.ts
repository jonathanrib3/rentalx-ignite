import { AppError } from "@shared/infra/errors/AppError";
import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "@modules/cars/repositories/ICategoriesRepository";

class CategoriesTestRepository implements ICategoriesRepository {
  private categories: Category[] = [];

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const nameAlreadyExists = await this.findByName(name);

    if (nameAlreadyExists) {
      throw new AppError(400, "Category already exists!");
    }

    const newCategory = new Category();

    Object.assign(newCategory, {
      name,
      description,
      created_at: Date(),
    });

    this.categories.push(newCategory);
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.categories.find(
      (category) => category.name === name
    );

    return category;
  }

  list(): Promise<Category[]> {
    throw new Error("Method not implemented.");
  }
}

export { CategoriesTestRepository };
