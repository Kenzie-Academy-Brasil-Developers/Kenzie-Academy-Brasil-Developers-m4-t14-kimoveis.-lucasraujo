import { z } from "zod";

const requestShedulesSchema = z.object({
    date:z.string(),
    hour:z.string(),
    realEstateId : z.number()
})



export {
    requestShedulesSchema
}