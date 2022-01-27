require("dotenv").config();

module.exports = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  username: process.env.DB_USERNAME,
  database: process.env.DATABASE,
  migrations: ["./src/shared/infra/typeorm/database/migrations/*.ts"],
  entities: [
    "./src/modules/cars/infra/typeorm/entities/*.ts",
    "./src/modules/accounts/infra/typeorm/entities/*.ts"
  ],
  cli: {
    migrationsDir: "./src/shared/infra/typeorm/database/migrations"
  }
}