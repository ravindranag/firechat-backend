import { Socket } from "socket.io"
import { io } from "../server.js"
import registerChatHandlers from "./chat.js"
import registerRoomHandlers from "./room.js"


/**
 * 
 * @param {Socket} socket 
 */
export const onConnection = (socket) => {
	console.log('User connected', socket.id)
	registerChatHandlers(io, socket)
	registerRoomHandlers(io, socket)
}