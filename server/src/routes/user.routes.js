import { Router } from "express";
import { getCurrentUser, getUser, loginUser, logoutUser, refreshAccessToken, registerUser } from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser)
router.route("/refresh-token").post(refreshAccessToken)

router.route("/logout").post(verifyJWT, logoutUser)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/profile/:id").get(getUser)

export default router;