import { Router } from "express";
import multer from "multer";
import { authentication } from "../middlewares/authentication";

import { CreateCategoryController } from "../modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoriesController } from "../modules/cars/useCases/importCategories/ImportCategoriesController";
import { ListCategoriesController } from "../modules/cars/useCases/listCategory/ListCategoriesController";

const categoriesRoutes = Router();
const upload = multer({ dest: "./tmp" });

const createCategoryController = new CreateCategoryController();
const importCategoriesController = new ImportCategoriesController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.get("/", listCategoriesController.handle);

categoriesRoutes.post("/", authentication, createCategoryController.handle);

categoriesRoutes.post(
  "/import",
  upload.single("categories_file"),
  importCategoriesController.handle
);

export { categoriesRoutes };
