import db from "../../lib/prisma/init.js"

/**
 * 
 * @param {string} room 
 * @returns 
 */
export const createNewPublicRoom = async (room) => {
	return db.publicRoom.create({
		data: {
			name: room
		}
	})
}

export const getAllPublicRooms = () => {
	return db.publicRoom.findMany()
}


/**
 * 
 * @param {string} roomId 
 */
export const getPublicRoomChats = (roomId) => {
	return db.publicRoom.findFirstOrThrow({
		where: {
			id: roomId
		},
		include: {
			chats: true
		}
	})
}

export const addChatToRoom = (roomId, chat) => {
	return db.publicChat.create({
		data: {
			content: chat.content,
			from: chat.from,
			roomId: roomId
		}
	})
}
