import { PrismaClient } from "@prisma/client/extension";
const prisma = PrismaClient();
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
const login = async (req , res) => {
    const { email , password } = req.body
    if(!email || !password) {
        return res.status(400).json({
            success: false,
            message: "missing email or password"
        })
    }
    try{
        const user = await prisma.User.findUnique({ where: { email } })
        if(!user) {
            return res.status(400).json({
                success: false,
                message: "invalid email or password"
            })
        }
        const isMatchPassword = bcrypt.compare(password , userExists.password)
        if(!isMatchPassword){
            return res.status(400).json({
                success: false,
                message: "incorrect email or password"
            })
        }

        const token = jwt.sign({ name : userExists.name, email: userExists.email , role: userExists.role } , process.env.SECRET_KEY , { expiresIn: "24h"})

        const cookieOptions = {
            maxAge: Date.now() + 24 * 60 * 60 * 10000,
            httpOnly: true,
        }
        res.cookie("token" , token , cookieOptions);


        res.status(200).json({
            success: true,
            message: "login successful",
            token: token,
            response: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        })
    }catch(error) {
        console.log(error.message);
        return res.status(400).json({
            success: false,
            message: "failed to login some internal server issues",
            error: error.message
        })
    }
}

export default login