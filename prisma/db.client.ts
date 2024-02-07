import {PrismaClient, Users} from '@prisma/client'

declare global {
  var prisma: PrismaClient
}

const prisma: PrismaClient = global.prisma || new PrismaClient()

export default prisma

export type UsersModel = Users
