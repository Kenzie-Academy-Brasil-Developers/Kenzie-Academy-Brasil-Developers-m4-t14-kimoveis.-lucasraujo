import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Users } from "../../entities/users.entities";
import { AppError } from "../../error";
import { iCreateUserData } from "../../interfaces/users.interfaces";
import { responseUserWithoutPassword } from "../../schemas/users.schema";

const creatUserServiser = async (reqData: iCreateUserData) => {
  const userRepository: Repository<Users> = AppDataSource.getRepository(Users);

  const findUser = await userRepository.findOne({
    where: {
      email: reqData.email,
    },
  });

  if (findUser) {
    throw new AppError("User  already exists.", 409);
  }

  const user = userRepository.create(reqData);

  await userRepository.save(user);

  const newUser = responseUserWithoutPassword.parse(user);

  return newUser;
};

export { creatUserServiser };
