import db from "../../lib/prisma/init.js"

export const getUserRoom = (userId) => {
	return db.usersInRoom.findMany({
		select: {
			roomId: true,
			room: {
				include: {
					users: {
						select: {
							user: {
								select: {
									username: true,
									name: true,
									avatar: true
								}
							}
						}
					}
				}
			},
		},
		where: {
			userId: userId
		}
	})
}

export const getRecentRoomChat = (roomId, userId) => {
	return db.chat.findMany({
		where: {
			AND: [
				{
					roomId: roomId
				},
				{
					OR: [
						{
							senderId: userId
						},
						{
							receiverId: userId
						}
					]
				}
			]
		},
		orderBy: {
			createdAt: 'desc'
		}
	})
}


export const createRoom = (userId, friendId) => {
	return db.room.create({
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
	})
}

export const deleteRoom = (roomId) => {
	return db.room.delete({
		where: {
			id: roomId
		}
	})
}

export const findRoomId = async (userId, friendId) => {
	return db.usersInRoom.findMany({
		where: {
			OR: [
				{
					userId: userId
				},
				{
					userId: friendId
				}
			]
		}
	})
		.then(users => users[0].roomId)
}