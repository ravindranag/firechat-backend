import { Server, Socket } from "socket.io";
import Acknowledgment from "./Acknowledgement.js";
import { saveChatToRoom } from "../app/room/repository.js";

/**
 * 
 * @param {Server} io 
 * @param {Socket} socket 
 */
const registerRoomHandlers = (io, socket) => {
	socket.on('room:join', (roomId, cb) => {
		console.log('join', roomId)
		socket.join(roomId)
		console.log(io.sockets.adapter.rooms.size)
		cb(new Acknowledgment('OK', 'Joined room'))
	})
	socket.on('room:leave', (roomId, cb) => {
		console.log('leave', roomId)
		socket.leave(roomId)
		console.log(io.sockets.adapter.rooms.size)
		cb(new Acknowledgment('OK', 'Left room'))
	})

	socket.on('room:send', (roomId, receiverId, message, cb) => {
		const senderId = socket.handshake.auth.userId
		if(!senderId) {
			cb(new Acknowledgment('FAILED', 'Forbidden Request'))
		}
		else {
			saveChatToRoom(roomId, senderId, receiverId, message)
				.then(chat => {
					socket.to(roomId).emit('room:receive', chat)
					cb(new Acknowledgment('OK', chat))
				})
				.catch(err => {
					console.log(err)
					cb(new Acknowledgment('FAILED', 'Failed to send'))
				})
		}
	})
}

export default registerRoomHandlers