import prisma from "@/prisma/db.client";
import Prisma from "@/prisma/types"

/**
 *
 * @param conditions
 * @param params
 */
async function getPage(conditions: Prisma.UsersFindManyArgs, params = {limit: 10, page: 1}) {
  const totalCount = await prisma.users.count({...(conditions?.where ? {where: conditions?.where} : {})})

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
    paginator: {limit: params.limit, page: params.page, totalCount, totalPage: Math.ceil(totalCount / params.limit)},
  }
}

export default {
  ...prisma.users
}
