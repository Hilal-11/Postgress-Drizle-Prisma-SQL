import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();
import bcypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
const register = async (req , res) => {
    const { name , email , phone , password} = req.body;
    if(!name || !email || !phone || !password ){
        return res.status(400).json({
            success: false,
            message: "Data is missing"
        })
    }
    try{
        const userExists = await prisma.user.findUnique({ 
            where : email 
        })
        if(userExists) {
            return res.status(400).json({
                success: false,
                message: "user already exists"
            })
        }
        // hash password field 
        const salt_round = bcypt.genSalt(10);
        const hash_password = bcypt.hash(password , salt_round)

        // generate varification token using default packege [Crypto]
        const varificationToken = crypto.randomBytes(32).toString("hex");
        // generate jwt varification token
        // const token = jwt.sign(
        //     {
        //         id: userExists.id,
        //         name: userExists.name,
        //         email: userExists.email
                
        //     },
        //     process.env.SECRET_KEY,
        //     {
        //         expiresIn: "24h"
        //     }
        // )

        // create user for storing the in DATABASE
        const user = await prisma.user.create({
            name,
            email,
            phone,
            password: hash_password,
            varificationToken
        })
        // save user

        // send mail using node mailer

        res.status(200).json({
            success: true,
            message: "successfully register user" 
        })

    }catch(error) {
        console.log(error.message)
        return res.status(400).json({
            success: false,
            message: "",
            error: error.message
        })
    }
}

export default register