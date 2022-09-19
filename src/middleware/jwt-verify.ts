import { NextFunction, Request, Response } from 'express'
import createError from 'http-errors'
import jwt from 'jsonwebtoken'

const jwtSecret = process.env.JWT_SECRET||''

export const jwtVerify = (req:Request,res:Response,next:NextFunction):void => {
    const token = req.headers.authorization?.split(' ')[1]
    const isValid = token ? jwt.verify(token,jwtSecret) : false
    if(isValid){
      next()
    }else{
      const err = createError(403,'invalid token')
      next(err)
    }
}