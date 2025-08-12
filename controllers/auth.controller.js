import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();


const registerUser = async (req , res ) => {
    console.log("register controller done")
    prisma.user.findUnique({
        where: { email }
    })
}

export default registerUser