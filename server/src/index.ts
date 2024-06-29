import  express, { json, Request, Response }  from "express";
import cors from "cors";
import { config } from "dotenv";
import { dbConnect } from "./lib/dbConnect";
import { compilerRouter } from "./routes/compilerRouter";
import { userRouter } from "./routes/userRouter";

const app = express();
app.use(express.json());
app.use(cors());
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