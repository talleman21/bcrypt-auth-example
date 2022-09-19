import { PrismaClient, User, Prisma } from '@prisma/client'
import createError from 'http-errors'


export class UserController {
  constructor(private readonly prisma:PrismaClient){}

  async findById(id:string):Promise<Partial<User>>{
    try {
      return await this.prisma.user.findUniqueOrThrow({
        where:{id},
        select:{
          id:true,
          email:true
        }
      })
    } catch (error) {
      throw createError(404,'get user failed')
    }
  }
}