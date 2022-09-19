import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import createError from 'http-errors'


export class AuthController {
  constructor(private readonly prisma:PrismaClient){}

  private jwtSecret = process.env.JWT_SECRET||""

  async signup(email:string,password:string):Promise<string>{
    try {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password,salt)
      
      const user = await this.prisma.user.create({
        data:{
          email,
          password: hash
        }
      })
  
      return jwt.sign({email:user.email},this.jwtSecret,{expiresIn:'3 hours'})
    } catch (error) {
      throw createError(500,'user signup failed')
    }
  }

  async login(email:string,password:string):Promise<string> {
    try {
      const user = await this.prisma.user.findUnique({where:{email}})
      if(user){
        const isValidUser = await bcrypt.compare(password,user.password)
        if(isValidUser){
          return jwt.sign({email:user.email},this.jwtSecret,{expiresIn:'3 hours'})
        }
      }
      throw 'email or password are incorrect'
    } catch (error) {
      throw createError(401,'email or password are incorrect')
    }
  }
}