import { Router } from "express";
import createError from "http-errors";
import { UserController } from "../controllers";
import { jwtVerify } from "../middleware/jwt-verify";
import { PrismaService } from "../services";

export const userRouter = Router()
const userController = new UserController(PrismaService)

userRouter.route('/:id')
.get(jwtVerify, async (req,res,next)=>{
  try {
    const user = await userController.findById(req.params.id)
    res.send(user)
  } catch (error) {
    next(error)
  }
})