'use server'
import db from "@/prisma/db.client";
import Prisma, {CategoriesModel, OptionsModel} from "@/prisma/types";

/**
 *
 * @param params
 */
export async function findFirst(params?: Prisma.OptionsFindFirstArgs): Promise<OptionsModel | null> {
  return db.options.findFirst(params)
}

/**
 *
 * @param params
 */
export async function update(params: Prisma.OptionsUpdateArgs): Promise<OptionsModel | null> {
  return db.options.update(params)
}

/**
 *
 * @param params
 */
export async function create(params: Prisma.OptionsCreateArgs): Promise<OptionsModel | null> {
  return db.options.create(params)
}

/**
 *
 * @param id
 */
export async function removeOne(id: string): Promise<OptionsModel | null> {
  const option = await db.options.findUnique({where: {id}}) as OptionsModel
  if (!option) return null;

  if (option.categoryIds.length) await db.options.update({
    where: {id},
    data: {Categories: {disconnect: option.categoryIds.map(id => ({id}))}}
  })

  return db.options.delete({where: {id}})
}

/**
 *
 * @param params
 * @param conditions
 */
export async function getPage(params = {limit: 10, page: 1, search: ''}, conditions?: Prisma.OptionsFindManyArgs) {
  const where = {
    ...(conditions?.where ?? {}),
    ...(params?.search?.length ? {
      OR: [
        {name: {contains: params.search, mode: 'insensitive'}},
        {title: {contains: params.search, mode: 'insensitive'}}
      ]
    } : {})
  } as Prisma.OptionsWhereInput

  conditions = conditions ? {...conditions, ...(Object.keys(where).length ? {where} : {})} : (Object.keys(where).length ? {where} : {})

  const total = await db.options.count({where: where})

  const items = await db.options.findMany({
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
