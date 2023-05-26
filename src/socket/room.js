import { Server, Socket } from "socket.io";
import Acknowledgment from "./Acknowledgement.js";

/**
 * 
 * @param {Server} io 
 * @param {Socket} socket 
 */
const registerRoomHandlers = (io, socket) => {
	socket.on('room:join', (roomId, cb) => {
		console.log('Request to join room', roomId)
		socket.join(roomId)
		cb(new Acknowledgment('OK', 'Room joined'))
	})
	socket.on('room:leave', (roomId, cb) => {
		console.log('Request to leave room', roomId)
		socket.leave(roomId)
		cb(new Acknowledgment('OK', 'Left room'))
	})

	socket.on('room:send', (payload, cb) => {
		console.log('room message', payload)

		cb(new Acknowledgment('OK', payload))
	})
}

export default registerRoomHandlers