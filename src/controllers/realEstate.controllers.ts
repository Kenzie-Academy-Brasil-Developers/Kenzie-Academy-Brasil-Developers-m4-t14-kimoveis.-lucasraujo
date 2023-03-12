import { Request, Response } from "express"
import { createRealEstateService } from "../services/realEstate/createRealEstate.services"
import { getAllRealEstateServices } from "../services/realEstate/getAllRealEstate.services"

const createRealEstateController = async (request: Request, response : Response) : Promise<Response>=> {

    const newRealEstate = await createRealEstateService(request)

    return response.status(201).json(newRealEstate)
}

const getRealEstateController = async (request: Request, response : Response) : Promise<Response>=> {

    const realEstates = await getAllRealEstateServices()

    return response.status(200).json(realEstates)
}

export{
    createRealEstateController, getRealEstateController
}