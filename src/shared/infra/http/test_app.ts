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

const testApp = express();
const connection = new Connection();

testApp.use(express.json());
testApp.use(router);
testApp.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
testApp.use(errorHandler);

export { testApp };
