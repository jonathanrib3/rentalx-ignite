import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from "@modules/cars/repositories/ISpecificationsRepository";

class SpecificationsTestRepository implements ISpecificationsRepository {
  private repository: Specification[];

  constructor() {
    this.repository = [];
  }
  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
      created_at: new Date(),
    });

    this.repository.push(specification);

    return specification;
  }

  async findByName(name: string): Promise<Specification> {
    const specification = this.repository.find(
      (specification) => specification.name === name
    );

    return specification;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications: Specification[] = [];

    ids.forEach((id) => {
      specifications.push(
        this.repository.find((specification) => specification.id === id)
      );
    });

    return specifications;
  }
  async list(): Promise<Specification[]> {
    return this.repository;
  }
}

export { SpecificationsTestRepository };
