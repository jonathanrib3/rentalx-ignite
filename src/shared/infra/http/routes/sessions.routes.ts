import { AuthorizateUserController } from "@modules/accounts/useCases/createSession/AuthorizateUserController";
import { Router } from "express";

const sessionsRoutes = Router();
const authorizateUserController = new AuthorizateUserController();

sessionsRoutes.post("/sessions", authorizateUserController.handle);

export { sessionsRoutes };
