import { getRecentRoomChat, getUserRoom } from "./repository.js"

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
export const getUserRoomController = async (req, res, next) => {
	const { locals: { decoded: { userId } } } = req
	try {
		const rooms = await getUserRoom(userId)
		return res.json(rooms)
	}
	catch(err) {
		return res.status(500).json('Cannot get rooms')
	}
}


/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
export const getRecentRoomChatController = async (req, res, next) => {
	const { locals: { decoded: { userId } }, params: { roomId } } = req
	try {
		const chats = await getRecentRoomChat(roomId, userId)
		return res.json(chats)
	}
	catch(err) {
		return res.sendStatus(500)
	}
}