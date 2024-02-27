'use server'
import db from "@/prisma/db.client";
import Prisma, {CollectionsModel} from "@/prisma/types";

/**
 *
 * @param params
 */
export async function findFirst(params?: Prisma.CollectionsFindFirstArgs): Promise<CollectionsModel | null> {
  return db.collections.findFirst(params)
}

/**
 *
 * @param params
 */
export async function update(params: Prisma.CollectionsUpdateArgs): Promise<CollectionsModel | null> {
  return db.collections.update(params)
}

/**
 *
 * @param params
 */
export async function create(params: Prisma.CollectionsCreateArgs): Promise<CollectionsModel | null> {
  return db.collections.create(params)
}

/**
 *
 * @param id
 */
export async function removeOne(id: string): Promise<CollectionsModel | null> {
  const collection = await db.collections.findUnique({where: {id}}) as CollectionsModel
  if (!collection) return null;

  if (collection.categoryIds.length) {
    await db.collections.update({
      where: {id},
      data: {
        Categories: {disconnect: collection.categoryIds.map(id => ({id}))}
      }
    })
  }

  return db.collections.delete({where: {id}})
}

/**
 *
 * @param params
 * @param conditions
 */
export async function getPage(params = {limit: 10, page: 1, search: ''}, conditions?: Prisma.CollectionsFindManyArgs) {
  const where = {
    ...(conditions?.where ?? {}),
    ...(params?.search?.length ? {
      OR: [
        {name: {contains: params.search, mode: 'insensitive'}},
        {title: {contains: params.search, mode: 'insensitive'}}
      ]
    } : {})
  } as Prisma.CollectionsWhereInput

  conditions = conditions ? {...conditions, ...(Object.keys(where).length ? {where} : {})} : (Object.keys(where).length ? {where} : {})

  const total = await db.collections.count({where: where})

  const items = await db.collections.findMany({
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
