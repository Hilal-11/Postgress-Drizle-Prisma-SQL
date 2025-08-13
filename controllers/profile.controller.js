
const profile = async (req , res) => {
    try{
        
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