import { hashSync } from "bcryptjs";
import { z } from "zod";

const UserCompleteSchema = z.object({
  id: z.number(),
  name: z.string().max(45),
  email: z.string().email().max(45),
  admin: z.boolean(),
  password: z.string().transform((pass) => {
    return hashSync(pass);
  }),
  createdAt: z.date().nullable(),
  updatedAt: z.date().nullable(),
  deletedAt: z.date().nullable(),
});

const createUserSchema = UserCompleteSchema.omit({
  id: true, createdAt: true, updatedAt: true, deletedAt: true
});

const responseUserWithoutPassword = UserCompleteSchema.omit({
  password: true,
});

const multipleResponseUserWithoutPasswordSchema = responseUserWithoutPassword.array()

const UpdateUserSchema = z.object({
  name: z.string().max(45).optional(),
  email: z.string().email().max(45).optional(),
  password: z.string().transform((pass) => {
    return hashSync(pass);
  }).optional()
})


export { createUserSchema, responseUserWithoutPassword , multipleResponseUserWithoutPasswordSchema,UpdateUserSchema};
