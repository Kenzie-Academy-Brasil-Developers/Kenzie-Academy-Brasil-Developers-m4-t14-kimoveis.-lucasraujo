import { Request } from "express"
import { AppDataSource } from "../../data-source"
import { Address, RealEstate } from "../../entities"
import { AppError } from "../../error"

const getSchedules = async (request : Request) =>{

    const idRealEstates = request.params.id
    const isAdmin = request.user.admin
    const realEstateRepository = AppDataSource.getRepository(RealEstate);


    if(isAdmin=== false){
        throw new AppError("Insufficient permission",403)
    }



    const objResp= await realEstateRepository.createQueryBuilder("realEstate")
       .innerJoinAndSelect("realEstate.address","address")
       .innerJoinAndSelect("realEstate.category","category")
       .leftJoinAndSelect("realEstate.schedules","schedules")
       .leftJoinAndSelect("schedules.users","users")
       .where("realEstate.id = :idreal",{idreal: idRealEstates})
       .getOne()

     if(!objResp){
        throw new AppError("RealEstate not found",404)

     }

    return objResp

}

export{
    getSchedules
}