import { z } from "zod";
import { loginSchema } from "../schemas/login.schema";


type iLoginRequestData = z.infer<typeof loginSchema>

export {
    iLoginRequestData
}