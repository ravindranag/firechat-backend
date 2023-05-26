import express, { json, urlencoded } from 'express'
import http from 'http'
import 'dotenv/config'
import { Server } from 'socket.io'
import cors from 'cors'
import {onConnection} from './socket/index.js'
import appRouter from './app/index.js'

const PORT = process.env.PORT

const app = express()
app.use(cors({
	origin: '*'
}))
app.use(json())
app.use(urlencoded({
	extended: true
}))


export const server = http.createServer(app)
export const io = new Server(server, {
	cors: {
		origin: '*'
	},
	path: '/room/'
})

io.on('connection', onConnection)

app.use('/api', appRouter)

server.listen(PORT, () => {
	console.log('Server listening on port:', PORT)
})
