import { Router } from "express";
import { createCategoriesControler, getAllCategoriesController, getRealEstateByCategoryController } from "../controllers/categories.controllers";
import { validateToken } from "../middlewares/validateToken.middleware";



const categoriesRoutes : Router = Router()

categoriesRoutes.post("",validateToken,createCategoriesControler )
categoriesRoutes.get("",getAllCategoriesController)
categoriesRoutes.get("/:id/realEstate",getRealEstateByCategoryController)

export default categoriesRoutes

