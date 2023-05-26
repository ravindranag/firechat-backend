import { Router } from "express";
import { verifyUserMiddleware } from "../user/helpers.js";
import { acceptFriendRequestController, createFriendRequestController, deleteFriendRequestController, getFriendRequestsForUserController, getFriendsController } from "./controller.js";

const router = Router()

router.use(verifyUserMiddleware)

router.get('/', getFriendsController)
router.post('/request/:friendId', createFriendRequestController)
router.delete('/request/delete/:userId/:friendId', deleteFriendRequestController)
router.get('/request', getFriendRequestsForUserController)
router.get('/accept/:userId/:friendId', acceptFriendRequestController)

export default router