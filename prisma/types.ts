import {Users, Brands, Options, Prisma} from '@prisma/client'

export default Prisma


export type UsersModel = Users & {
  brands?: BrandsModel[]
}
export type BrandsModel = Brands & {
  user?: UsersModel
}

export type OptionsModel = Options
