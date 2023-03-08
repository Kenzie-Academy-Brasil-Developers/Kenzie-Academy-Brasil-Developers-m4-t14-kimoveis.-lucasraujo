import { Request } from "express"
import { AppDataSource } from "../../data-source"
import { Users } from "../../entities/users.entities"
import { AppError } from "../../error"
import { iMultipleResponseUserWithoutPassword } from "../../interfaces/users.interfaces"
import { multipleResponseUserWithoutPasswordSchema } from "../../schemas/users.schema"

const getAllUsersService = async (request : Request) : Promise<iMultipleResponseUserWithoutPassword>=> {

const userRepository = AppDataSource.getRepository(Users)
const userIsAdmin = request.user.admin

if(!userIsAdmin){
    throw new AppError("insufficient permission",403 )
}

const allUsers = await userRepository.find()

const treatedAllUsers = multipleResponseUserWithoutPasswordSchema.parse(allUsers)

return treatedAllUsers


}

export{ getAllUsersService}