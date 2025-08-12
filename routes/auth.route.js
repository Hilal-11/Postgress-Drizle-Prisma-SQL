import express from "express"
const userRouter = express.Router();

import registerUser from "../controllers/auth.controller"

router.post("/register" , registerUser);

export default userRouter