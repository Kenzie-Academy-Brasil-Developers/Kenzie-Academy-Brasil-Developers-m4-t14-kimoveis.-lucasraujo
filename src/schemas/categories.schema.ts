import { z } from "zod";


const createCategoriesShema= z.object({
    name: z.string().max(45)
})

export {
    createCategoriesShema
}