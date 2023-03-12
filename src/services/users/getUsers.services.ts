import { Request } from "express"
import { AppDataSource } from "../../data-source"
import { User } from "../../entities/users.entities"
import { AppError } from "../../error"
import { iMultipleResponseUserWithoutPassword } from "../../interfaces/users.interfaces"
import { multipleResponseUserWithoutPasswordSchema } from "../../schemas/users.schema"

const getAllUsersService = async (request : Request) : Promise<iMultipleResponseUserWithoutPassword>=> {

const userRepository = AppDataSource.getRepository(User)
const userIsAdmin = request.user.admin

if(!userIsAdmin){
    throw new AppError("Insufficient permission",403 )
}

const allUsers = await userRepository.find()

const treatedAllUsers = multipleResponseUserWithoutPasswordSchema.parse(allUsers)

return treatedAllUsers


}

export{ getAllUsersService}