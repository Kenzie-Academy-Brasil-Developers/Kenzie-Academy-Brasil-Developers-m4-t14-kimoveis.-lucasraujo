import { hashSync } from "bcryptjs";
import { z } from "zod";

const UserCompleteSchema = z.object({
  id: z.number(),
  name: z.string().max(45),
  email: z.string().email().max(45),
  admin: z.boolean().default(false).optional(),
  password: z.string().max(120),
  createdAt: z.string().nullable(),
  updatedAt: z.string().nullable(),
  deletedAt: z.string().nullable(),
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
  password: z.string().optional()
})


export { createUserSchema, responseUserWithoutPassword , multipleResponseUserWithoutPasswordSchema,UpdateUserSchema};
