import express from "express"
const userRouter = express.Router();

import register from "../controllers/register.controller.js"
import varify from '../controllers/varify.controller.js'
import login from '../controllers/login.controller.js'
import profile from '../controllers/profile.controller.js'
import forgetPassword from '../controllers/forgetPassword.controller.js'
import resetPassword from '../controllers/resetPassword.controller.js'
import logout from '../controllers/logout.controller.js'

router.post("/register" , register);
router.post("/varify/:token" , varify);
router.post("/login" , login);
router.get("/profile" , profile);
router.post("/forgetPassword" , forgetPassword);
router.post("/resetPassword" , resetPassword);
router.get("/logout", logout);

export default userRouter