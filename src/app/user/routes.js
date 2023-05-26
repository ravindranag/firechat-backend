import { Router } from "express";
import { userLoginController, userSignUpController, userVerifyController } from "./controller.js";
import { verifyUserMiddleware } from "./helpers.js";

const router = Router()

router.post('/', userSignUpController)
router.post('/login', userLoginController)
router.get('/verify', verifyUserMiddleware, userVerifyController)

export default router