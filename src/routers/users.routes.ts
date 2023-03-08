import { Router } from "express";
import { createUserController, getUsersController, updateUsersController,deleteUsersController } from "../controllers/users.controllers";
import { validateToken } from "../middlewares/validateToken.middleware";

const userRoutes : Router = Router();

userRoutes.post("",createUserController)
userRoutes.get("",validateToken ,getUsersController)
userRoutes.patch("/:id", validateToken, updateUsersController)
userRoutes.delete("/:id", validateToken, deleteUsersController)


export default userRoutes