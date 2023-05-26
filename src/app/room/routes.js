import { Router } from "express";
import { verifyUserMiddleware } from "../user/helpers.js";
import { getRecentRoomChatController, getUserRoomController } from "./controller.js";
import { findRoomId } from "./repository.js";

const router = Router()

router.use(verifyUserMiddleware)

router.get('/', getUserRoomController)
router.get('/:roomId/chats', getRecentRoomChatController)

export default router