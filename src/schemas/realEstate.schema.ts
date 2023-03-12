import { z } from "zod";

const addressSchema = z.object({
  street: z.string().max(45),
  zipCode: z.string().max(8),
  number: z.string().max(7).optional().default("null"),
  city: z.string().max(20),
  state: z.string().max(2),
});
const realEstateSchema = z.object({
  value: z.any(),
  size: z.number().gt(0),
  address: addressSchema,
  categoryId: z.number(),
  sold: z.boolean().default(false),
});

const realEstateWithoutAddressSchema = realEstateSchema.omit({
  address: true,
  categoryId: true,
});

export { realEstateSchema, realEstateWithoutAddressSchema };
