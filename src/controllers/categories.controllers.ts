import { Request, Response } from "express"
import { createCategories } from "../services/categories/createCategories.services"
import { getAllCategoriesServices } from "../services/categories/getAllCategories.services"

const createCategoriesControler = async (request: Request, response: Response) : Promise<Response>=>{

    const newCategories = await createCategories(request)

    return response.status(201).json(newCategories)


}

const getAllCategoriesController = async (request: Request, response: Response) : Promise<Response>=> { 

   const allCategories = await getAllCategoriesServices()

    return response.status(200).json(allCategories )

}

export{ 
    createCategoriesControler,getAllCategoriesController
}