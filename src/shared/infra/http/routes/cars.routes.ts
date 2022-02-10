import { authentication } from "@middlewares/authentication";
import uploadConfig from "@config/upload";
import { ensureAdmin } from "@middlewares/ensureAdmin";
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { UploadCarsImagesController } from "@modules/cars/useCases/uploadCarsImages/UploadCarsImagesController";
import { Router } from "express";
import multer from "multer";

const carsRoutes = Router();
const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarsImagesController = new UploadCarsImagesController();

const upload = multer(uploadConfig.upload("./tmp/avatar"));

carsRoutes.get("/available", listAvailableCarsController.handle);

carsRoutes.post(
  "/specifications/:car_id",
  createCarSpecificationController.handle
);

carsRoutes.post("/", authentication, ensureAdmin, createCarController.handle);

carsRoutes.patch(
  "/images/:car_id",
  authentication,
  ensureAdmin,
  upload.array("images"),
  uploadCarsImagesController.handle
);

export { carsRoutes };
