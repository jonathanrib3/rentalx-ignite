import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "@modules/cars/repositories/ICategoriesRepository";
import { getRepository, Repository } from "typeorm";

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  // eslint-disable-next-line no-use-before-define
  private static INSTANCE: CategoriesRepository;

  constructor() {
    this.repository = getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const newCategory = this.repository.create({
      name,
      description,
    });

    await this.repository.save(newCategory);
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();
    return categories;
  }

  findByName(name: string): Promise<Category> {
    const category = this.repository.findOne({ name });
    return category;
  }
}

export { CategoriesRepository };
