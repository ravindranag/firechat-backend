import { verifyToken } from "./repository.js"

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
export const verifyUserMiddleware = (req, res, next) => {
	const token = req.headers.authorization
	if(!token) {
		res.status(403).json('No token provided')
	}
	try {
		const payload = verifyToken(token)
		req.locals = {
			decoded: payload
		}
		next()
	}
	catch(err) {
		res.status(403).json('Invalid token')
	}
}