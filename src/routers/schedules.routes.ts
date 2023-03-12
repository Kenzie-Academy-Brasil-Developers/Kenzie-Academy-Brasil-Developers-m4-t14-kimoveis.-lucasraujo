import { Router } from "express";
import { scheduleControllers , getSchedulesControllers} from "../controllers/schedules.controllers";

import { validateToken } from "../middlewares/validateToken.middleware";


const schedulesRoutes : Router = Router()

schedulesRoutes.post("",validateToken,scheduleControllers) 
schedulesRoutes.get("/realEstate/:id",validateToken,getSchedulesControllers ) 

export default schedulesRoutes