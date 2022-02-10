import express from "express";
import swaggerUi from "swagger-ui-express";
import "@root/config.js";
import "express-async-errors";
import "reflect-metadata";
import swaggerFile from "@root/swagger.json";
import { router } from "./routes";
import "@shared/containers";
import "@shared/containers/providers";
import { errorHandler } from "./middlewares/errorHandler";
import { Connection } from "../typeorm/Connection";

const app = express();
const connection = new Connection();

connection.create().then(() => {
  app.use(express.json());
  app.use(router);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
  app.use(errorHandler);
});
export { app };
