import { authentication } from "@middlewares/authentication";
import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { Router } from "express";

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();

rentalsRoutes.post("/", authentication, createRentalController.handle);

export { rentalsRoutes };
