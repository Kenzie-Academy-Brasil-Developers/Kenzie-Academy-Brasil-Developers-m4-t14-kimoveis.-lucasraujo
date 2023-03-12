import { compare } from "bcryptjs"
import jwt from "jsonwebtoken"

import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { User } from "../../entities/users.entities"
import { AppError } from "../../error"
import { iLoginRequestData } from "../../interfaces/login.interfaces"

const loginServices = async (bodyLogin: iLoginRequestData ) =>{

    const userRepository : Repository<User> = AppDataSource.getRepository(User)

    const findUser  =  await userRepository.findOne({
        where:{
            email: bodyLogin.email
        }
    })

    if(!findUser){
        throw new AppError("Invalid credentials",401 )
    }

   const matchPassword : boolean = await compare(bodyLogin.password, findUser.password)

   if(!matchPassword){
    throw new AppError("Invalid credentials",401 )
   }

    const token : string = jwt.sign(
    {
        admin : findUser.admin
    },
    process.env.SECRET_KEY!
    ,{
        expiresIn : process.env.EXPIRES_IN,
        subject: findUser.id.toString()
    }
    )

    return token

}

export {
    loginServices
}