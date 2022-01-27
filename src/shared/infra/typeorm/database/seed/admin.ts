import { hashSync } from "bcrypt";
import { v4 as uuidV4 } from "uuid";
import { Connection } from "../../Connection";

async function seed() {
  const connection = new Connection();
  await connection.create();
  console.log(connection.status());

  const id = uuidV4();
  const password = hashSync("admin", 10);

  await connection.getDefaultConnection().query(
    `INSERT INTO USERS (id , name, email, password, driver_license, admin, created_at) 
      values ('${id}', 'admin', 'admin@rentx.com.br','${password}','666666',true,'now()')
      `
  );

  await connection.close();
}

seed();
