import { hashSync } from "bcryptjs";
import { z } from "zod";

const  loginSchema = z.object({
    email: z.string().email().max(45),
    password: z.string()
})

export {loginSchema}