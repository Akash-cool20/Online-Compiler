import  express, { json, Request, Response }  from "express";
import cors from "cors";
import { config } from "dotenv";
import { dbConnect } from "./lib/dbConnect";
import { compilerRouter } from "./routes/compilerRouter";
import { userRouter } from "./routes/userRouter";
import cookieParser from "cookie-parser"

const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(cors({credentials:true, origin:"http://localhost:5173"}));
config();

app.use("/compiler",compilerRouter);
app.use("/user",userRouter);


dbConnect();
app.get("/",(req: Request,res: Response)=>{
    return res.status(200).send("OK")
})

app.listen(4000, ()=>{
    console.log("http://localhost:4000");
})