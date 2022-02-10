import { AppError } from "@errors/AppError";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/containers/providers/IDateProvider";
import { inject, injectable } from "tsyringe";

interface IRequest {
  car_id: string;
  user_id: string;
  expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("DayjsDateProvider")
    private dayjsProvider: IDateProvider
  ) {}

  async execute({ car_id, user_id, expected_return_date }: IRequest) {
    const carExists = await this.carsRepository.findById(car_id);

    if (!carExists) {
      throw new AppError(400, "Car doesn't exists");
    }

    const userExists = await this.usersRepository.findById(user_id);

    if (!userExists) {
      throw new AppError(400, "User doesn't exists");
    }

    const carIsAlreadyRented = await this.rentalsRepository.findOpenRentalByCar(
      car_id
    );

    if (carIsAlreadyRented) {
      throw new AppError(400, "This car is already being rented");
    }

    const userHasOpenRent = await this.rentalsRepository.findOpenRentalByUser(
      user_id
    );

    console.log(userHasOpenRent);

    if (userHasOpenRent) {
      throw new AppError(400, "The user already has an open rental");
    }

    const EXPECTED_RETURN_DATE_LEAST_AMOUNT_OF_HOURS = 24;

    const dateNow = this.dayjsProvider.dateNow();

    const compare = this.dayjsProvider.compareInHours(
      dateNow,
      expected_return_date
    );

    if (compare < EXPECTED_RETURN_DATE_LEAST_AMOUNT_OF_HOURS) {
      throw new AppError(400, "Expected return date lesser than 24 hours");
    }

    const rental = await this.rentalsRepository.create({
      car_id,
      user_id,
      expected_return_date,
    });

    return rental;
  }
}

export { CreateRentalUseCase };
