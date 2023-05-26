import { Router } from "express";
import { createRoomController, getPublicRoomChatsController, getPublicRoomController } from "./controller.js";

const router = Router()

router.post('/', createRoomController)
router.get('/', getPublicRoomController)
router.get('/:roomId/chats', getPublicRoomChatsController)

export default router