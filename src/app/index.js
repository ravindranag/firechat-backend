import { Router } from "express";
import { roomRouter } from "./room/index.js";
import { userRouter } from "./user/index.js";
import { friendRouter } from "./friend/index.js";
import db from "../lib/prisma/init.js";

const appRouter = Router()

appRouter.get('/status', async (req, res, next) => {
	try {
		const metrics = await db.$metrics.json()
		res.json({
			message: 'Server running',
			connection: metrics.counters[2].value
		})
	}
	catch(err) {
		console.log(err)
		res.status(500).json({
			message: 'Server running but db not'
		})
	}
})

appRouter.use('/room', roomRouter)
appRouter.use('/user', userRouter)
appRouter.use('/friend', friendRouter)

export default appRouter