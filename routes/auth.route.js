import express from "express"
const router = express.Router();

import registerUser from "../controllers/auth.controller"

router.post("/register" , registerUser);

module.exports = router