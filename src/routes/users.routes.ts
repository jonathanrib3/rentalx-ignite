import { Router } from "express";
import multer from "multer";

import uploadConfig from "../config/upload";
import { authentication } from "../middlewares/authentication";
import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";
import { UpdateAvatarController } from "../modules/accounts/useCases/updateAvatar/UpdateAvatarController";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const updateAvatarController = new UpdateAvatarController();

const upload = multer(uploadConfig.upload("./tmp/avatar"));

usersRoutes.post("/", createUserController.handle);

usersRoutes.patch(
  "/avatar",
  authentication,
  upload.single("avatar"),
  updateAvatarController.handle
);

export { usersRoutes };
