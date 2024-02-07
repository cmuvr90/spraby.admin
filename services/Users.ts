'use server'
import db from "@/prisma/db";
import {UsersModel} from "@/prisma/db.client";


export async function getUsersList() {
  return db.users.findMany() as Promise<UsersModel[]>
}

export async function findByEmail(email: string) {
  return db.users.findFirst({where: {email}}) as Promise<UsersModel | null>
}

export async function createUser(params: CreateUserParams) {
  return db.users.create({
    data: {
      email: params.email,
      role: 'admin', //todo remove
      password: params.password
    }
  }) as Promise<UsersModel | null>
}


type CreateUserParams = {
  email: string
  password: string
}
