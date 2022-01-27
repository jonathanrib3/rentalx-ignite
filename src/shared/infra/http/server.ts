import express from "express";
import swaggerUi from "swagger-ui-express";
import "dotenv/config";
import "express-async-errors";
import "reflect-metadata";
import swaggerFile from "@root/swagger.json";
import "@shared/infra/typeorm/database";
import { router } from "./routes";
import "@shared/containers";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(express.json());
app.use(router);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(errorHandler);

app.listen(process.env.SERVER_PORT, () =>
  console.log(
    `Server running on http://${process.env.SERVER_ADDRESS}:${process.env.SERVER_PORT}`
  )
);
