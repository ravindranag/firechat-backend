import { createNewPublicRoom, getAllPublicRooms, getPublicRoomChats } from './repository.js'

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {import('express').NextFunction} next 
 */
export const createRoomController = async (req, res, next) => {
	const {name} = req.body
	try {
		const room = await createNewPublicRoom(name)
		return res.json({
			message: 'room created',
			room
		})
	}
	catch(err) {
		return res.status(400).json('Room creation failed')
	}
}


/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {import('express').NextFunction} next 
 */
export const getPublicRoomController = async (req, res, next) => {
	const allPublicRooms = await getAllPublicRooms()
	return res.json(allPublicRooms)
}


/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {import('express').NextFunction} next 
 */
export const getPublicRoomChatsController = async (req, res, next) => {
	const { roomId } = req.params
	const chats = await getPublicRoomChats(roomId)
	return res.json(chats)
}