import { Request } from "express"
import { AppDataSource } from "../../data-source"
import { Users } from "../../entities/users.entities"
import { AppError } from "../../error"

const deleteUserService = async(request : Request) => {

    const idParams = Number(request.params.id)
    const userIsAdmin = request.user.admin

    const userRepository = AppDataSource.getRepository(Users)

    if(!userIsAdmin){
        throw new AppError("insufficient permission",403 )
    }



    const user = await userRepository.findOne({
        where: {
            id: idParams
        }
    })

    if(!user){
        throw new AppError("user not found",404 )
    }

    await userRepository.softRemove(user)

}

export{
    deleteUserService
}