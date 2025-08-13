import { PrismaClient } from "@prisma/client/extension"
const prisma = PrismaClient()
const profile = async (req , res) => {
    const { userId } = req.user.id
    try{
        const user = await prisma.User.findUnique({ where: { userId } })
        if(!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "user info",
            response: user,
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
export default profile