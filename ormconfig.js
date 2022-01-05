require("dotenv").config();

module.exports = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  username: process.env.DB_USERNAME,
  database: process.env.DATABASE,
  migrations: ["./src/database/migrations/*.ts"],
  entities: [
    "./src/modules/cars/entities/*.ts",
    "./src/modules/accounts/entities/*.ts"
  ],
  cli: {
    migrationsDir: "./src/database/migrations"
  }
}