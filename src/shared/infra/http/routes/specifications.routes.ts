import { authentication } from "@shared/infra/http/middlewares/authentication";
import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ListSpecificationsController } from "@modules/cars/useCases/listSpecifications/ListSpecificationsController";
import { Router } from "express";
import { ensureAdmin } from "@middlewares/ensureAdmin";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationsController = new ListSpecificationsController();

specificationsRoutes.get("/", listSpecificationsController.handle);

specificationsRoutes.post(
  "/",
  authentication,
  ensureAdmin,
  createSpecificationController.handle
);

export { specificationsRoutes };
