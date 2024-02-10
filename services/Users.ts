'use server'
import db from "@/prisma/db";
import Prisma, {Paginator, UsersModel} from "@/prisma/types";

/**
 *
 * @param params
 * @param conditions
 */
export async function getUsersPage(params = {limit: 10, page: 1}, conditions?: Prisma.UsersFindManyArgs) {
  return await db.users.getPage(conditions ?? {}, params) as {
    items: UsersModel[]
    paginator: Paginator
  }
}

export async function getUsersList() {
  return db.users.findMany() as Promise<UsersModel[]>
}

export async function findByEmail(email: string) {
  return db.users.findFirst({where: {email}}) as Promise<UsersModel | null>
}

export async function createUser(params: CreateUserParams) {
  const bcrypt = require('bcrypt');

  return db.users.create({
    data: {
      email: params.email,
      // role: 'admin', //todo remove
      password: await bcrypt.hash(params.password, 3)
    }
  }) as Promise<UsersModel | null>
}

type CreateUserParams = {
  email: string
  password: string
}
