import db from "../../lib/prisma/init"
import { FriendStatus } from '@prisma/client'

/**
 * 
 * @param {string} userId 
 * @param {string} friendId 
 * @param {FriendStatus} status
 */
export const createFriend = async (userId, friendId, status) => {
	return db.friend.create({
		data: {
			friendId: friendId,
			status: status
		}
	})
		.then(friend => db.user.update({
			where: {
				id: userId
			},
			data: {
				friends: {
					connect: {
						id: friend.id
					}
				}
			}
		}))
}


/**
 * 
 * @param {string} friendId 
 * @returns 
 */
export const confirmFriendship = (friendId) => {
	return db.friend.update({
		data: {
			status: FriendStatus.CONFIRMED
		},
		where: {
			id: friendId
		}
	})
}  