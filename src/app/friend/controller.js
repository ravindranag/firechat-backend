import { acceptFriendRequest, createFriend, deleteFriend, deleteFriendRequest, getFriendRequestsForUser, getFriendsByUser } from "./repository.js"

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
export const createFriendRequestController = async (req, res, next) => {
	const { locals: { decoded: { userId } } } = req
	const { friendId } = req.params
	if(userId === friendId) {
		return res.status(400).json('You\'ve already got a friend in you')
	}
	else {
		try {
			await createFriend(userId, friendId)
			return res.json('Friend request sent')
		}
		catch(err) {
			return res.status(400).json('Cannot send friend request.')
		}
	}
}


/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
export const getFriendsController = async (req, res, next) => {
	const { locals: { decoded: { userId } } } = req
	const friends = await getFriendsByUser(userId)
	return res.json(friends)
}


/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
export const getFriendRequestsForUserController = async (req, res, next) => {
	const { locals: { decoded: { userId } } } = req
	const friendRequests = await getFriendRequestsForUser(userId)
	return res.json(friendRequests)
}


/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
export const acceptFriendRequestController = async (req, res, next) => {
	const { userId, friendId } = req.params
	try {
		await acceptFriendRequest(userId, friendId)
		return res.json('Friend request accepted')
	}
	catch(err) {
		console.log(err)
		return res.sendStatus(400)
	}
}


/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
export const deleteFriendRequestController = async (req, res, next) => {
	const requestingUserId = req.locals.decoded.userId
	const { userId, friendId } = req.params
	if(requestingUserId !== userId && requestingUserId !== friendId) {
		return res.sendStatus(403)
	}
	else {
		try {
			await deleteFriendRequest(userId, friendId)
			return res.json('Friend request deleted')
		}
		catch(err) {
			return res.sendStatus(500)
		}
	}
}


/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
export const deleteFriendController = async (req, res, next) => {
	const { userId, friendId } = req.params
	try {
		await deleteFriend(userId, friendId)
		return res.json('Friend removed')
	}
	catch(err) {
		console.log(err)
		return res.sendStatus(400)
	}
}	