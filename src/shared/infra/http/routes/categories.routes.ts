import { ensureAdmin } from "@middlewares/ensureAdmin";
import { CreateCategoryController } from "@modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoriesController } from "@modules/cars/useCases/importCategories/ImportCategoriesController";
import { ListCategoriesController } from "@modules/cars/useCases/listCategory/ListCategoriesController";
import { authentication } from "@shared/infra/http/middlewares/authentication";
import { Router } from "express";
import multer from "multer";

const categoriesRoutes = Router();
const upload = multer({ dest: "./tmp" });

const createCategoryController = new CreateCategoryController();
const importCategoriesController = new ImportCategoriesController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.get("/", listCategoriesController.handle);

categoriesRoutes.post(
  "/",
  authentication,
  ensureAdmin,
  createCategoryController.handle
);

categoriesRoutes.post(
  "/import",
  authentication,
  ensureAdmin,
  upload.single("categories_file"),
  importCategoriesController.handle
);

export { categoriesRoutes };
