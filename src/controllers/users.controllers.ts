import { Request, Response } from "express";
import { creatUserServiser } from "../services/users/createUsers.services";
import { createUserSchema } from "../schemas/users.schema";
import { iCreateUserData, iMultipleResponseUserWithoutPassword } from "../interfaces/users.interfaces";
import { getAllUsersService } from "../services/users/getUsers.services";
import { updateUserServices } from "../services/users/updateUser.services";
import { deleteUserService } from "../services/users/deleteUser.services";

const createUserController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const reqBody: iCreateUserData = createUserSchema.parse(request.body);
  const res = await creatUserServiser(reqBody);

  return response.status(201).json(res);
};

const getUsersController = async (
  request: Request,
  response: Response
): Promise<Response> => {

  const allUsers : iMultipleResponseUserWithoutPassword = await  getAllUsersService(request)


  return response.status(200).json(allUsers);
};

const updateUsersController = async (
  request: Request,
  response: Response
): Promise<Response> => {

  const updatedUser = await  updateUserServices(request)


  return response.status(200).json(updatedUser);
};
const deleteUsersController = async (
  request: Request,
  response: Response
): Promise<Response> => {

   await deleteUserService(request )


  return response.status(204).json();
};




export { createUserController, getUsersController , updateUsersController, deleteUsersController};
