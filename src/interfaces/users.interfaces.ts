import {z} from "zod";
import { createUserSchema, multipleResponseUserWithoutPasswordSchema } from "../schemas/users.schema";

type iCreateUserData =  z.infer<typeof createUserSchema>


type iMultipleResponseUserWithoutPassword = z.infer<typeof  multipleResponseUserWithoutPasswordSchema>

export{
    iCreateUserData,
    iMultipleResponseUserWithoutPassword
}