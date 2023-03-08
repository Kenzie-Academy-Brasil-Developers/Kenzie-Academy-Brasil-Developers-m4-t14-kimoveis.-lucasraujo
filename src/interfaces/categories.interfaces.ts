import { z } from "zod";
import { createCategoriesShema } from "../schemas/categories.schema";

type iCreateCategories = z.infer<typeof createCategoriesShema>

export{
    iCreateCategories
}