import { AppDataSource } from "../../data-source"
import { Category } from "../../entities/categories.entities"

const getAllCategoriesServices = async() =>{

    const categoriesRepository = AppDataSource.getRepository(Category)

    const allCategories = await categoriesRepository.find()

    return allCategories

}

export { 
    getAllCategoriesServices
}