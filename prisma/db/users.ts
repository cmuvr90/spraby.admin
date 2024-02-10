import prisma from "@/prisma/db.client";
import Prisma from "@/prisma/types"

/**
 *
 * @param conditions
 * @param params
 */
async function getPage(conditions: Prisma.UsersFindManyArgs, params = {limit: 10, page: 1}) {
  const total = await prisma.users.count({...(conditions?.where ? {where: conditions?.where} : {})})

  const items = await prisma.users.findMany({
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

export default {
  ...prisma.users,
  getPage
}
