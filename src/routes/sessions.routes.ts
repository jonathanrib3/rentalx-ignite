import { Router } from "express";

import { AuthorizateUserController } from "../modules/accounts/useCases/createSession/AuthorizateUserController";

const sessionsRoutes = Router();
const authorizateUserController = new AuthorizateUserController();

sessionsRoutes.post("/sessions", authorizateUserController.handle);

export { sessionsRoutes };
