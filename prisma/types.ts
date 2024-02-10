import {Users, Prisma} from '@prisma/client'

export default Prisma
export type UsersModel = Users
export type Paginator = { pageSize: number, current: number, total: number, pages: number }
