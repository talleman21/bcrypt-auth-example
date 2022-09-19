import express, { NextFunction, Request, Response } from 'express'
import { HttpError } from 'http-errors'
import {authRouter} from './routes'
import { userRouter } from './routes/user'

const app = express()

const port = typeof process.env.PORT === 'string' ? parseInt(process.env.PORT) : 3000
const hostname = process.env.HOSTNAME || 'localhost'

app.use(express.json())

app.use('/auth',authRouter)
app.use('/user',userRouter)

app.use((error:HttpError,req:Request,res:Response,next:NextFunction) =>{
  res.status(error.status || 500);
  res.send(error.message||'server error')
})


app.listen(port,hostname,()=>{
  console.log(`server started on ${hostname}:${port}`)
})