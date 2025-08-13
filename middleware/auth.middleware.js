import { PrismaClient } from "@prisma/client/extension";
const prisma = PrismaClient();
import jwt, { decode } from "jsonwebtoken"
const isLoggedIn = async (req , res , next) => {
    const { token } = req.cookies?.token;
    console.log(token)
    
    if(!token) {
        return res.status(400).json({
            success: false,
            message: "Token is missing"
        })
    }
    try{
        const decoded = jwt.verify(token , process.env.SECRET_KEY)
        console.log(decode)
        req.user = decoded
        next()
    }catch(error) {
        console.log(error.message);
        res.status().json({
            success: false,
            message: "",
            error: error.message
        })
    }
}

export default isLoggedIn;