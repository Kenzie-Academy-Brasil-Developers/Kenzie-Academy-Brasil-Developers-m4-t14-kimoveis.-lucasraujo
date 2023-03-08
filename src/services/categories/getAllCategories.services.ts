import { AppDataSource } from "../../data-source"
import { Categories } from "../../entities/categories.entities"

const getAllCategoriesServices = async() =>{

    const categoriesRepository = AppDataSource.getRepository(Categories)

    const allCategories = await categoriesRepository.find()

    return allCategories

}

export { 
    getAllCategoriesServices
}