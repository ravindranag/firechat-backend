import bcrypt from 'bcrypt'
import db from '../../lib/prisma/init.js'
import jwt from 'jsonwebtoken'
import { SELECT_USER_FRIEND, SELECT_USER_FRIEND_REQUESTS } from '../../lib/prisma/select.js'
import { FriendStatus } from '@prisma/client'

const saltRounds = 10
const JWT_SECRET = process.env.JWT_SECRET

const hashPassword = (plainPassword) => {
	return bcrypt.hash(plainPassword, saltRounds)
}

export const matchPassword = (enteredPassword, hash) => {
	return bcrypt.compare(enteredPassword, hash)
}

export const createNewUser = async (user) => {
	user.password = await hashPassword(user.password)
	return db.user.create({
		data: user
	})
}

export const userExistsByEmail = async (email) => {
	let count = await db.user.count({
		where: {
			email: email
		}
	})
	return count > 0 ? true : false
}

export const userExistsById = async (id) => {
	let count = await db.user.count({
		where: {
			id: id
		}
	})
	return count > 0 ? true : false
}

export const getUserByEmail = (email) => {
	return db.user.findFirstOrThrow({
		where: {
			email: email
		}
	})
}

export const getUserById = (userId) => {
	return db.user.findFirstOrThrow({
		where: {
			id: userId
		}
	})
}

export const generateToken = (payload) => {
	return jwt.sign(payload, JWT_SECRET, {
		algorithm: 'HS256',
		expiresIn: '30d',
		issuer: 'chat.ravindranag.in',
		audience: 'chat:frontend'
	})
}

export const verifyToken = (token) => {
	return jwt.verify(token, JWT_SECRET)
}

export const searchUser = (nameLike, userId) => {
	return db.user.findMany({
		where: {
			OR: [
				{
					name: {
						contains: nameLike,
						mode: 'insensitive'
					}
				},
				{
					username: {
						contains: nameLike,
						mode: 'insensitive'
					}
				}
			],
			NOT: {
				OR: [
					{
						id: {
							equals: userId
						}
					},
					{
						friends: {
							some: {
								friendId: userId
							}
						}
					},
					{
						friendRequests: {
							some: {
								userId: userId
							}
						}
					}
				]
			},
		},
		select: {
			id: true,
			name: true,
			username: true,
			avatar: true
		}
	})
}

export const getUserProfile = (userId) => {
	return db.user.findFirstOrThrow({
		where: {
			id: userId,
		},
		select: {
			id: true,
			name: true,
			email: true,
			username: true
		}
	})
}