import { ICategoriesRepository } from "./ICategoriesRepository";

class PostgresRepository implements ICategoriesRepository {
  create({ name, description }) {
    console.log(
      `postgres repository criou categoria ${name} com a descrição ${description}`
    );
  }
  findByName(name: string) {
    console.log(`Achou o nome ${name}`);
    return null;
  }
  list() {
    console.log("Listou todos");
    return null;
  }
}
