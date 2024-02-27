'use server'
import db from "@/prisma/db.client";
import Prisma, {CategoriesModel} from "@/prisma/types";

/**
 *
 * @param params
 */
export async function findFirst(params?: Prisma.CategoriesFindFirstArgs): Promise<CategoriesModel | null> {
  return db.categories.findFirst(params)
}

/**
 *
 * @param params
 */
export async function update(params: Prisma.CategoriesUpdateArgs): Promise<CategoriesModel | null> {
  return db.categories.update(params)
}

/**
 *
 * @param params
 */
export async function create(params: Prisma.CategoriesCreateArgs): Promise<CategoriesModel | null> {
  return db.categories.create(params)
}

/**
 *
 * @param id
 */
export async function removeOne(id: string): Promise<CategoriesModel | null> {
  const category = await db.categories.findUnique({where: {id}}) as CategoriesModel
  if (!category) return null;

  if (category.collectionIds.length || category.optionIds.length) {
    await db.categories.update({
      where: {id},
      data: {
        Collections: {disconnect: category.collectionIds.map(id => ({id}))},
        Options: {disconnect: category.optionIds.map(id => ({id}))}
      }
    })
  }

  return db.categories.delete({where: {id}})
}

/**
 *
 * @param params
 * @param conditions
 */
export async function getPage(params = {limit: 10, page: 1, search: ''}, conditions?: Prisma.CategoriesFindManyArgs) {
  const where = {
    ...(conditions?.where ?? {}),
    ...(params?.search?.length ? {
      OR: [
        {name: {contains: params.search, mode: 'insensitive'}},
        {title: {contains: params.search, mode: 'insensitive'}}
      ]
    } : {})
  } as Prisma.CategoriesWhereInput

  conditions = conditions ? {...conditions, ...(Object.keys(where).length ? {where} : {})} : (Object.keys(where).length ? {where} : {})

  const total = await db.categories.count({where: where})

  const items = await db.categories.findMany({
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
