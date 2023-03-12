import { Request } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities/categories.entities";
import { AppError } from "../../error";
import { iCreateCategories } from "../../interfaces/categories.interfaces";
import { createCategoriesShema } from "../../schemas/categories.schema";


const createCategories  = async (request : Request) =>{

    const categoriesRepository : Repository<Category>  = AppDataSource.getRepository(Category)

    const userIsAdmin = request.user.admin

    const body: iCreateCategories = createCategoriesShema.parse(request.body)

    if(!userIsAdmin){
        throw new AppError("Insufficient permission",403)
    }


    const findCategory = await categoriesRepository.findOne({
        where:{
            name: body.name
        }
    })

    if(findCategory ){
        throw new AppError("Category already exists", 409)
    }


    const category = categoriesRepository.create(body)

    await categoriesRepository.save(category)
    
    return category



}

export{
    createCategories
}