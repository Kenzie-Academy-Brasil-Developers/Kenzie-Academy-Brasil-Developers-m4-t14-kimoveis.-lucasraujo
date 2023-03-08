import { Router } from "express";
import { createCategoriesControler, getAllCategoriesController } from "../controllers/categories.controllers";
import { validateToken } from "../middlewares/validateToken.middleware";



const categoriesRoutes : Router = Router()

categoriesRoutes.post("",validateToken,createCategoriesControler )
categoriesRoutes.get("",getAllCategoriesController)

export default categoriesRoutes

