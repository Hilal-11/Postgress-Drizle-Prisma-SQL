import { PrismaClient } from "@prisma/client/extension";
const prisma = PrismaClient();
const logout = async (req , res) => {
    try{
        res.cookie("token" , "" , {});
        res.status(200).json({
            success: true,
            message: "Logout successfully"
        })
    }catch(error) { 
        res.status(400).json({
            success: false,
            message: "failed to logout",
            error: error.message
        })
    }
}

export default logout