import { Router } from "express";
import { roomRouter } from "./room/index.js";
import { userRouter } from "./user/index.js";
import { friendRouter } from "./friendship/index.js";

const appRouter = Router()

appRouter.use('/room', roomRouter)
appRouter.use('/user', userRouter)
appRouter.use('/friend', friendRouter)

export default appRouter