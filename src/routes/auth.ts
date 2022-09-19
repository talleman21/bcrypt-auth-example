import { Router } from "express";
import createError from "http-errors";
import { AuthController } from "../controllers/auth";
import { PrismaService } from "../services";

export const authRouter = Router()
const authController = new AuthController(PrismaService)

authRouter.route('/login')
.post(async (req,res,next)=>{
  try {
    const {email,password} = req.body
    if(!email || !password){
      next(createError(400,'email or password not supplied'))
    }
    const token = await authController.login(email,password)
    res.status(200)
    res.header('authorization',`Bearer ${token}`)
    res.send({success:true})
  } catch (error) {
    next(error)
  }
})


authRouter.route('/signup')
.post(async (req,res,next) => {
  try {
    const {email,password} = req.body
    if(!email || !password) {
      next(createError(400,'email or password not supplied'))
    }
    const token = await authController.signup(email,password)
    res.status(201)
    res.header('authorization',`Bearer ${token}`)
    res.send({success:true})
  } catch (error) {
    next(error)
  }
})