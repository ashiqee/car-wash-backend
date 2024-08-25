import express, { Application, Request, Response } from "express";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";
import cors from "cors"
import globalErrorHandler from "./app/middlewares/globalErrorhandler";
import cookieParser from "cookie-parser";
const app : Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:['http://localhost:5173']
}))

app.use('/api/',router)

const apiCheck = async (req:Request,res:Response)=>{
    const message = "Car wash server api running";
    res.send(message)
}


app.get('/api',apiCheck);

app.use(globalErrorHandler)
app.use(notFound)


export default app ;