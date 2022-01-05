import { Router } from "express";

import { authentication } from "../middlewares/authentication";
import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ListSpecificationsController } from "../modules/cars/useCases/listSpecifications/ListSpecificationsController";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationsController = new ListSpecificationsController();

specificationsRoutes.get("/", listSpecificationsController.handle);

specificationsRoutes.post(
  "/",
  authentication,
  createSpecificationController.handle
);

export { specificationsRoutes };
