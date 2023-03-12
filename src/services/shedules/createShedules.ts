import { Request } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate } from "../../entities/realEstate.entities";
import { Schedule } from "../../entities/schedule.entities";
import { User } from "../../entities/users.entities";
import { AppError } from "../../error";
import { iCreateShedules } from "../../interfaces/shedules.interfaces";
import { requestShedulesSchema } from "../../schemas/schedules.schema";

const hourToNumber = (hour: string) => {
  const num1 = hour.split("")[0];
  const num2 = hour.split("")[1];
  const num3 = hour.split("")[3];
  const num4 = hour.split("")[4];
  const nuns = num1 + num2 + num3 + num4;
  return Number(nuns);
};

const createShedulesServices = async (request: Request) => {
  const schedulesRepository = AppDataSource.getRepository(Schedule);
  const userRepository = AppDataSource.getRepository(User);
  const realEstateRepository = AppDataSource.getRepository(RealEstate);
  const reqBody = requestShedulesSchema.parse(request.body);
  const userId = request.user.id;
  const realEstateId = reqBody.realEstateId;
  const date = new Date(reqBody.date);
  const date2 = reqBody.date;
  const hour = reqBody.hour;

  if (date.getUTCDay() === 0 || date.getUTCDay() === 6) {
    throw new AppError("Invalid date, work days are monday to friday", 400);
  }

  if (
    hourToNumber(hour) < hourToNumber("08:00") ||
    hourToNumber(hour) > hourToNumber("18:00")
  ) {
    throw new AppError("Invalid hour, available times are 8AM to 18PM", 400);
  }

  const user = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const realEstate = await realEstateRepository.findOne({
    where: {
      id: realEstateId,
    },
  });

  if (realEstate === null) {
    throw new AppError("RealEstate not found", 404);
  }

  const realEstates = await realEstateRepository
    .createQueryBuilder("realEstate")
    .leftJoinAndSelect("realEstate.schedules", "schedules")
    .where("schedules.date = :date", { date: date2 })
    .andWhere("schedules.hour = :hour", { hour: hour })
    .andWhere("realEstate.id = :rid", { rid: realEstateId })
    .getOne();

  if (realEstates) {
    throw new AppError(
      "Schedule to this real estate at this date and time already exists",
      409
    );
  }

  const schedules = await schedulesRepository
    .createQueryBuilder("schedules")
    .innerJoinAndSelect("schedules.user", "user")
    .where("schedules.date = :date", { date: date })
    .andWhere("schedules.hour = :hour", { hour: hour })
    .andWhere("user.id = :uid", { uid: userId })
    .getOne();

    
  if (schedules) {
    throw new AppError(
      "User schedule to this real estate at this date and time already exists",
      409
    );
  }

  const newSchedule = schedulesRepository.create({
    date: date2,
    hour: hour,
    user: user,
    realEstate: realEstate,
  });

  await schedulesRepository.save(newSchedule);

  return newSchedule;
};

export { createShedulesServices };
