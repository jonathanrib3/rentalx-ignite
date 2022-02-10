import { testApp } from "@shared/infra/http/test_app";
import { Connection } from "@shared/infra/typeorm/Connection";
import request, { Response } from "supertest";

let connection: Connection;
let token_response: Response;
describe("list categories integration tests", () => {
  beforeAll(async () => {
    connection = new Connection();
    await connection.create();

    token_response = await request(testApp).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin",
    });

    const { token } = token_response.body;

    await request(testApp)
      .post("/categories")
      .set("authorization", `Bearer ${token}`)
      .send({
        name: "List category test",
        description: "So, i ran out of creative titles...",
      });
  });

  it("should be able to list all existent categories", async () => {
    const response = await request(testApp).get("/categories");

    expect(response.status).toBe(200);
    expect(response.body.length > 0).toBe(true);
  });

  afterAll(async () => {
    await connection.close();
  });
});
