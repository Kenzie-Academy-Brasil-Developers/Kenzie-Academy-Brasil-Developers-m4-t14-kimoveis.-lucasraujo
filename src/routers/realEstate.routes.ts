import { Router } from "express";
import { createRealEstate } from "../controllers/realEstate.controllers";

const realEstate : Router = Router()

realEstate.post("",  createRealEstate)


export default realEstate