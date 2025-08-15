import { PrismaClient } from "@prisma/client/extension";
const prisma = PrismaClient();
const varify = async (req , res) => {
    const { token } = req.params;
    if(!token) {
        return res.status(400).json({
            success: false,
            message: "token is missing"
        })
    }
    try{

        const user = await prisma.user.findUnique({ where: { varificationToken: token }})
        if(!user) {
            return res.status(400).json({
                success: false,
                message: "incorrect token user not exists"
            })
        }

        await prisma.user.update({
            where: { id: user.id },
            data: {
                isVarify: true,
                varificationToken: ""
            }
        })

        res.status(200).json({
            success: true,
            message: "failed to varify the user"
        })

    }catch(error) {
        console.log(error.message);
        res.status().json({
            success: false,
            message: "",
            error: error.message
        })
    }
}

export default varify