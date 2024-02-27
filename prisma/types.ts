import {Users, Brands, Options, Categories, Collections, Prisma} from '@prisma/client'

export default Prisma


export type UsersModel = Users & {
  brands?: BrandsModel[]
}
export type BrandsModel = Brands & {
  user?: UsersModel
}

export type OptionsModel = Options & {
  Categories?: CategoriesModel[]
}

export type CategoriesModel = Categories & {
  Options?: OptionsModel[]
  Collections?: CollectionsModel[]
}

export type CollectionsModel = Collections & {
  Categories?: Categories[]
}
