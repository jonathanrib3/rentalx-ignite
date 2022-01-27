import { AppError } from "@shared/infra/errors/AppError";
import { CategoriesTestRepository } from "@modules/cars/repositories/in-memory/CategoriesTestRepository";
import CreateCategoryUseCase from "./CreateCategoryUseCase";

let categoryTestRepository: CategoriesTestRepository;
let createCategoryUseCase: CreateCategoryUseCase;

describe("Create Category", () => {
  beforeEach(() => {
    categoryTestRepository = new CategoriesTestRepository();
    createCategoryUseCase = new CreateCategoryUseCase(categoryTestRepository);
  });
  it("should create a new category with a new name", async () => {
    await createCategoryUseCase.execute({
      name: "SUV",
      description: "Só as máquinas de destruição",
    });

    const createdCategory = await categoryTestRepository.findByName("SUV");

    expect(createdCategory).toHaveProperty("id");
  });
  it("should not create a new category with an existent name", async () => {
    expect(async () => {
      const category = {
        name: "SUV",
        description: "Só as máquinas de destruição",
      };

      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      });

      await createCategoryUseCase.execute({
        name: category.name,
        description: "Any other description",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
