import {Users, Brands, Prisma} from '@prisma/client'

export default Prisma


export type UsersModel = Users & {
  brands?: BrandsModel[]
}
export type BrandsModel = Brands & {
  user?: UsersModel
}
