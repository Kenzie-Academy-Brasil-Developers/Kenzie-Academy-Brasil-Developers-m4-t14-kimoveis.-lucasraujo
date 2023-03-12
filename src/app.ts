import 'express-async-errors';
import express, { Application } from 'express'
import { handleErrors } from './error';
import userRoutes from './routers/users.routes';
import loginRoutes from './routers/login.routes';
import  categoriesRoutes from './routers/categories.routes';
import realEstate from './routers/realEstate.routes';
import schedulesRoutes from './routers/schedules.routes';

const app: Application = express()
app.use(express.json())


app.use("/users", userRoutes)
app.use("/login", loginRoutes)
app.use("/categories", categoriesRoutes)
app.use("/realEstate", realEstate)
app.use("/schedules",schedulesRoutes)

app.use(handleErrors)
export default app