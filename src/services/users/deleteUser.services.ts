import { Request } from "express"
import { AppDataSource } from "../../data-source"
import { User } from "../../entities/users.entities"
import { AppError } from "../../error"

const deleteUserService = async(request : Request) => {

    const idParams = Number(request.params.id)
    const userIsAdmin = request.user.admin

    const userRepository = AppDataSource.getRepository(User)
    
    const user = await userRepository.findOne({
        where: {
            id: idParams
        }
    })

    if(!user){
        throw new AppError("User not found",404 )
    }


    if(!userIsAdmin){
        throw new AppError("Insufficient permission",403 )
    }




    await userRepository.softRemove(user)

}

export{
    deleteUserService
}