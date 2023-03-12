import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/users.entities";
import { AppError } from "../../error";
import { iCreateUserData } from "../../interfaces/users.interfaces";
import { responseUserWithoutPassword } from "../../schemas/users.schema";

const creatUserServiser = async (reqData: iCreateUserData| any) => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOne({
    where: {
      email: reqData.email,
    },
  });

  if (findUser) {
    throw new AppError("Email already exists", 409);
  }

  const user = userRepository.create(reqData);

  await userRepository.save(user);

  const newUser = responseUserWithoutPassword.parse(user);

  return newUser;
};

export { creatUserServiser };
