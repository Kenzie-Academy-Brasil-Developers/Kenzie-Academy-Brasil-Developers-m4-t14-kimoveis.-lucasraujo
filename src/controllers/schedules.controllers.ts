import { Request, Response } from "express";
import { createShedulesServices } from "../services/shedules/createShedules";
import { getSchedules } from "../services/shedules/getSchedules";

const scheduleControllers = async ( request : Request, response : Response ) : Promise<Response>  => {


    const shedules = await createShedulesServices(request)

    return response.status(201).json({message: "Schedule created"})

}
const getSchedulesControllers = async  ( request : Request, response : Response ) : Promise<Response>  => {

    const res = await getSchedules(request)
    return response.status(200).json(res)
}


export{
    scheduleControllers,getSchedulesControllers
}