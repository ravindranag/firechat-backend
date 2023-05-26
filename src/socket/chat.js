import { Socket, Server } from "socket.io"
import Acknowledgment from "./Acknowledgement.js"

/**
 * Chat event handlers
 * @param {Server} io 
 * @param {Socket} socket 
 */
const registerChatHandlers = (io, socket) => {
	socket.on('chat:send', (payload, callback) => {
		callback(new Acknowledgment('OK', payload))
	})
}

export default registerChatHandlers