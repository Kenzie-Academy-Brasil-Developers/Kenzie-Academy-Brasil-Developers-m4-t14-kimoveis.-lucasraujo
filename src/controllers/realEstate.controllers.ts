import { Request, Response } from "express"
import { createRealEstateService } from "../services/realEstate/createRealEstate.services"

const createRealEstate = async (request: Request, response : Response) : Promise<Response>=> {

    const newRealEstate = await createRealEstateService(request)
    





    return response.status(201).json(newRealEstate)
}

export{
    createRealEstate 
}