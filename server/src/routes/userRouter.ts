import express from "express"
import { signup, login, logout, userDetails } from "../controllers/userController";
import { verifyToken } from "../middlewares/verifytoken";


export const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.get("/userdetails", verifyToken, userDetails );
