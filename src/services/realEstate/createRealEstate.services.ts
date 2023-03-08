import { Request } from "express"
import { number } from "zod"
import { AppDataSource } from "../../data-source"
import { Adresses } from "../../entities/addresses.entities"
import { Categories } from "../../entities/categories.entities"
import { RealEstate } from "../../entities/real_estate.entities"
import { AppError } from "../../error"
import { realEstateSchema, realEstateWithoutAddressSchema } from "../../schemas/realEstate.services"

const createRealEstateService = async (request: Request) => {
    
    const reqBody = realEstateSchema.parse(request.body)

    const adress = reqBody.address
    const idOfCategory = Number(reqBody.categoryId)

    const realEstateRepository = AppDataSource.getRepository(RealEstate)
    const adressesRepository = AppDataSource.getRepository(Adresses)
    const categoryRepository = AppDataSource.getRepository(Categories)

    const category =await categoryRepository.find({
        where:{
            id: idOfCategory
        }
    })

    if(!category){
        throw new AppError("category not found", 404)
    }

   const adressCreate = adressesRepository.create(adress)

   const adressSave = await adressesRepository.save(adressCreate)

   const createBody = realEstateWithoutAddressSchema.parse(reqBody)



    const realEstate = realEstateRepository.create({        
        ...createBody,
        category: category,
        adresses: adressSave
    })

    console.log({        
        ...createBody,
        categoryId: category,
        adressesId: adressSave
    })

  // await realEstateRepository.save(realEstate)

    return realEstate

}

export{
    createRealEstateService
}