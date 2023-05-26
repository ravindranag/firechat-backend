import { getUserById, verifyToken } from "./repository.js"

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
export const verifyUserMiddleware = async (req, res, next) => {
	const token = req.headers.authorization
	if(!token) {
		res.status(403).json('No token provided')
	}
	else {
		try {
			const payload = verifyToken(token)
			const requestingUser = await getUserById(payload.userId)
			req.locals = {
				decoded: payload,
				requestingUser
			}
			next()
		}
		catch(err) {
			res.status(403).json('Invalid token')
		}
	}
}