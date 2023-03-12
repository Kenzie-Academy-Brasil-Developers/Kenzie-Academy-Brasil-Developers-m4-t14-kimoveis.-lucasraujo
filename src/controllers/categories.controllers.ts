import { Request, Response } from "express"
import { AppError } from "../error"
import { createCategories } from "../services/categories/createCategories.services"
import { getAllCategoriesServices } from "../services/categories/getAllCategories.services"
import { getRealEstateByCategoryServices } from "../services/categories/getRealEstateByCategory.services"

const createCategoriesControler = async (request: Request, response: Response) : Promise<Response>=>{

    const newCategories = await createCategories(request)

    return response.status(201).json(newCategories)


}

const getAllCategoriesController = async (request: Request, response: Response) : Promise<Response>=> { 

   const allCategories = await getAllCategoriesServices()

    return response.status(200).json(allCategories )

}


const getRealEstateByCategoryController = async (request: Request, response:Response) : Promise<Response> => {

    const allRealEstate = await getRealEstateByCategoryServices(request)
    if(allRealEstate === null ){
        throw new AppError("Category not found",404)
    }

    return response.status(200).json(allRealEstate)
}

export{ 
    createCategoriesControler,getAllCategoriesController, getRealEstateByCategoryController 
}