import { testApp } from "@shared/infra/http/test_app";
import { Connection } from "@shared/infra/typeorm/Connection";
import request, { Response } from "supertest";

let token_response: Response;
let connection: Connection;

describe("create category integration tests", () => {
  beforeAll(async () => {
    connection = new Connection();
    awaoken_response = await request(testApp).post("/sessions").send({
        email: "admin@rentx.com.br",
        password: "admin",
      });it connection.create().then(async () => {
      t
    });
  });

  it("should be able to create a new category", async () => {
    const { token } = token_response.body;
    const response = await request(testApp)
      .post("/categories")
      .set("authorization", `Bearer ${token}`)
      .send({
        name: "Testt category",
        description: "Test description 1 - The king's ascension",
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Category created successfully!");
  });

  it("should not be able to create new category with same name", async () => {
    const { token } = token_response.body;

    const response = await request(testApp)
      .post("/categories")
      .set("authorization", `Bearer ${token}`)
      .send({
        name: "Test category",
        description: "Test description 2 - The Return of the Fallen Ones",
      });

    expect(response.status).toBe(400);
    expect(response.body).toBe("Category already exists!");
  });

  afterAll(async () => {
    await connection.close();
  });
});
