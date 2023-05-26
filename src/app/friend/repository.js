import db from "../../lib/prisma/init.js"
import { FriendStatus } from '@prisma/client'
import { SELECT_USER_FRIEND_REQUESTS } from "../../lib/prisma/select.js"
import { deleteRoom, findRoomId } from "../room/repository.js"

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
	return db.friend.update({
		where: {
			userId_friendId: {
				userId: userId,
				friendId: friendId	
			}
		},
		data: {
			status: FriendStatus.CONFIRMED
		}
	})
		.then(() => createFriend(friendId, userId, FriendStatus.CONFIRMED))
		.then(() => db.room.create({
			data: {
				users: {
					createMany: {
						data: [
							{
								userId: userId
							},
							{
								userId: friendId
							}
						]
					}
				}
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


export const deleteFriend = async (userId, friendId) => {
	return deleteFriendRequest(userId, friendId)
		.then(() => deleteFriendRequest(friendId, userId))
		.then(() => findRoomId(userId, friendId))
		.then(roomId => deleteRoom(roomId))
}