import { Router } from "express";
import { createRealEstateController, getRealEstateController } from "../controllers/realEstate.controllers";
import { validateToken } from "../middlewares/validateToken.middleware";

const realEstate : Router = Router()

realEstate.post("",validateToken,  createRealEstateController)
realEstate.get("",  getRealEstateController)


export default realEstate