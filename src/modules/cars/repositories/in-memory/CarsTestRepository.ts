import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";

class CarsTestRepository implements ICarsRepository {
  private repository: Car[];

  constructor() {
    this.repository = [];
  }

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
    id,
  }: ICreateCarDTO) {
    const newCar = new Car();

    Object.assign(newCar, {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      id: id || newCar.id,
    });

    await this.repository.push(newCar);

    return newCar;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.find(
      (car) => car.license_plate === license_plate
    );

    return car;
  }

  async findById(id: string): Promise<Car> {
    const car = this.repository.find((car) => car.id === id);

    return car;
  }

  async listAvailableCars(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]> {
    const availableCars = this.repository.filter(
      (car) => car.available === true
    );

    if (!brand && !category_id && !name) {
      return availableCars;
    }

    const filteredAvailableCars = availableCars.filter((car) => {
      if (
        (brand && car.brand === brand) ||
        (category_id && car.category_id === category_id) ||
        (name && car.name === name)
      ) {
        return car;
      }
      return null;
    });
    return filteredAvailableCars;
  }
}

export { CarsTestRepository };
