import { Prisma } from "@prisma/client"

export const SELECT_USER_FRIEND = {
	userId: true,
	friendId: true,
	friend: {
		select: {
			name: true,
			username: true,
			avatar: true
		}
	}
}

/**
 * @type {Prisma.FriendSelect}
 */
export const SELECT_USER_FRIEND_REQUESTS = {
	userId: true,
	friendId: true,
	user: {
		select: {
			name: true,
			username: true,
			avatar: true
		}
	},
	status: true
}