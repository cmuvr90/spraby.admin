'use server'

import db from "@/prisma/db.client";
import Prisma, {UsersModel} from "@/prisma/types";

/**
 *
 * @param params
 * @param conditions
 */
export async function getPage(params = {limit: 10, page: 1}, conditions?: Prisma.UsersFindManyArgs) {
  const total = await db.users.count({...(conditions?.where ? {where: conditions?.where} : {})})

  const items = await db.users.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    ...conditions,
    skip: (params.page - 1) * params.limit,
    take: params.limit,
  })

  return {
    items,
    paginator: {pageSize: params.limit, current: params.page, total, pages: Math.ceil(total / params.limit)},
  }
}

/**
 *
 */
export async function getList() {
  return db.users.findMany() as Promise<UsersModel[]>
}

/**
 *
 * @param email
 */
export async function findByEmail(email: string) {
  return db.users.findFirst({where: {email}}) as Promise<UsersModel | null>
}

/**
 *
 * @param id
 */
export async function findById(id: string) {
  return db.users.findFirst({where: {id, role: {not: 'admin'}}}) as Promise<UsersModel | null>
}

/**
 *
 * @param params
 */
export async function update(params: Prisma.UsersUpdateArgs) {
  return db.users.update(params) as Promise<UsersModel | null>
}

/**
 *
 * @param params
 */
export async function create(params: CreateUserParams) {
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
