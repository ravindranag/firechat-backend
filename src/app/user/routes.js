import { Router } from "express";
import { searchUserController, userLoginController, userProfileController, userSignUpController, userVerifyController } from "./controller.js";
import { verifyUserMiddleware } from "./helpers.js";

const router = Router()

router.post('/', userSignUpController)
router.post('/login', userLoginController)
router.get('/verify', verifyUserMiddleware, userVerifyController)
router.get('/search', verifyUserMiddleware, searchUserController)
router.get('/profile', verifyUserMiddleware, userProfileController)

export default router