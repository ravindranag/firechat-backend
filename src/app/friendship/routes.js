import { Router } from "express";
import { verifyUserMiddleware } from "../user/helpers.js";
import { createFriendRequestController } from "./controller.js";

const router = Router()

router.use(verifyUserMiddleware)

router.post('/request/:friendId', createFriendRequestController)
router.post('/:friendId/confirm', verifyUserMiddleware)
router.delete('/:friendId', verifyUserMiddleware)

export default router