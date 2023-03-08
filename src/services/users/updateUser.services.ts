import { Request } from "express";
import { AppDataSource } from "../../data-source";
import { Users } from "../../entities/users.entities";
import { AppError } from "../../error";
import { responseUserWithoutPassword, UpdateUserSchema } from "../../schemas/users.schema";

const updateUserServices  =  async(request : Request ) =>{

    const idParams = Number(request.params.id)
    const userId = Number(request.user.id)
    const userIsAdmin = request.user.admin
    const bodyUpdate : any = UpdateUserSchema.parse(request.body)
    const userRepository = AppDataSource.getRepository(Users)

    if(!userIsAdmin && userId != idParams){
        throw new AppError("insufficient permission",403)
    }
    

    const user = await userRepository.findOne({
        where:{
            id:idParams
        }
    })

    const userUpdated = userRepository.create({
        ...user,
        ...bodyUpdate
    })

    await userRepository.save(userUpdated)

    

    return responseUserWithoutPassword.parse(userUpdated)

}

export{updateUserServices}