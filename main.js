import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
dotenv.config()
import cors from 'cors'
import authRouter from './routes/auth.route'
const PORT = process.env.PORT
const app = express();

app.use(cookieParser());
const corsOptions = {
    origin: process.env.BASE_URL,
    methods: ["POST","GET","PUT","PATCH","DELETE"],
    allowedHeaders: ["Content-Type", "Authentication"],
    Credential: true
}
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded( { extended: true } ))
app.use('/api/v1/users' , authRouter);


app.get("/" , (req , res) => {
    res.send("<h1>Full stack with SQL</h1>");
})

app.listen(PORT , () => {
    console.log("App is running on",PORT)
})