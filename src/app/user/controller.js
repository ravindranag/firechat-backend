import { createNewUser, generateToken, getUserByEmail, matchPassword, userExistsByEmail } from "./repository.js"

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
export const userSignUpController = async (req, res, next) => {
	const data = req.body
	try {
		if(await userExistsByEmail(data.email)) {
			return res.status(400).json('User with email already exists.')
		}
		else {
			const user = await createNewUser(data)
			return res.json(user)
		}
	}
	catch(err) {
		return res.status(400).json('User creation failed')
	}
}


/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
export const userLoginController = async (req, res, next) => {
	const { email, password } = req.body
	try {
		const user = await getUserByEmail(email)
		if(!(await matchPassword(password, user.password))) {
			return res.status(400).json('Wrong password')
		}
		else {
			const token = generateToken({
				userId: user.id,
				name: user.name
			})
			return res.json(token)
		}
	}
	catch(err) {
		console.log(err)
		return res.status(404).json('User does not exist')
	}
}


/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
export const userVerifyController = async (req, res, next) => {
	const { locals: { decoded } } = req
	res.json(decoded)
}
