'use server'
import db from "@/prisma/db.client";
import Prisma, {BrandsModel} from "@/prisma/types";


/**
 *
 */
export async function getList() {
  return db.brands.findMany() as Promise<BrandsModel[]>
}

/**
 *
 * @param id
 * @param include
 */
export async function findById(id: string, include?: Prisma.BrandsInclude) {
  return db.brands.findFirst({
    where: {id},
    ...(include ? {include} : {})
  }) as Promise<BrandsModel | null>
}

/**
 *
 * @param params
 */
export async function update(params: Prisma.BrandsUpdateArgs) {
  return db.brands.update(params) as Promise<BrandsModel | null>
}

/**
 *
 * @param data
 */
export async function create(data: Prisma.BrandsCreateInput) {
  return db.brands.create({data}) as Promise<BrandsModel | null>
}

/**
 *
 * @param params
 * @param conditions
 */
export async function getPage(params = {limit: 10, page: 1}, conditions?: Prisma.BrandsFindManyArgs) {
  const total = await db.brands.count({...(conditions?.where ? {where: conditions?.where} : {})})

  const items = await db.brands.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      user: true
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
