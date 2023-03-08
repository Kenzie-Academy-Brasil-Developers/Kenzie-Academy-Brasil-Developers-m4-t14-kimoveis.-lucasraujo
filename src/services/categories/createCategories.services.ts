import { Request } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Categories } from "../../entities/categories.entities";
import { AppError } from "../../error";
import { iCreateCategories } from "../../interfaces/categories.interfaces";
import { createCategoriesShema } from "../../schemas/categories.schema";


const createCategories  = async (request : Request) =>{

    const categoriesRepository : Repository<Categories>  = AppDataSource.getRepository(Categories)

    const userIsAdmin = request.user.admin

    const body: iCreateCategories = createCategoriesShema.parse(request.body)

    if(!userIsAdmin){
        throw new AppError("insufficient permission",403)
    }


    const findCategory = await categoriesRepository.findOne({
        where:{
            name: body.name
        }
    })

    if(findCategory ){
        throw new AppError("category already exists.", 409)
    }


    const category = categoriesRepository.create(body)

    await categoriesRepository.save(category)
    
    return category



}

export{
    createCategories
}