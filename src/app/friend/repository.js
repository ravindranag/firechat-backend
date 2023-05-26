import db from "../../lib/prisma/init.js"
import { FriendStatus } from '@prisma/client'
import { SELECT_USER_FRIEND_REQUESTS } from "../../lib/prisma/select.js"

/**
 * 
 * @param {string} userId 
 * @param {string} friendId 
 * @param {FriendStatus} status
 */
export const createFriend = async (userId, friendId, status=FriendStatus.PENDING) => {
	return db.friend.create({
		data: {
			userId: userId,
			friendId: friendId,
			status: status
		}
	})
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

/**
 * @param {string} userId
 */
export const getFriendsByUser = (userId) => {
	return db.friend.findMany({
		where: {
			userId: userId,
		},
		select: {
			friendId: true,
			status: true,
			friend: {
				select: {
					name: true,
					username: true,
					avatar: true
				}
			}
		}
	})
}

export const getFriendRequestsForUser = (userId) => {
	return db.friend.findMany({
		where: {
			friendId: userId,
			status: FriendStatus.PENDING
		},
		select: SELECT_USER_FRIEND_REQUESTS
	})
}

export const acceptFriendRequest = async (userId, friendId) => {
	return createFriend(friendId, userId, FriendStatus.CONFIRMED)
		.then(() => db.friend.update({
			where: {
				userId_friendId: {
					userId: userId,
					friendId: friendId	
				}
			},
			data: {
				status: FriendStatus.CONFIRMED
			}
		}))
}

export const deleteFriendRequest = (userId, friendId) => {
	return db.friend.delete({
		where: {
			userId_friendId: {
				userId: userId,
				friendId: friendId
			}
		}
	})
}