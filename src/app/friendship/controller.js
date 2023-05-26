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
		return res.json({userId, friendId})
	}
}