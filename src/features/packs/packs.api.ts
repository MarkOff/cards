import { instance } from "common/api";
import * as url from "url";

export const packsApi = {
  getPacks: (params: PacksArgType) =>
    instance.get<PacksType>("cards/pack", { params })
      .then(res => res.data),

  addPack: (arg: AddPackArgType) => {
    return instance.post<CreatePackResponseType>("cards/pack", { cardsPack: arg });
  },
  deletePack: (id: string) => {
    return instance.delete<RemovePackResponseType>(`cards/pack?id=${id}`);
  },
  updatePack: (cardsPack: CardPacksType) => {
    return instance.put<UpdatePackResponseType>("cards/pack", { cardsPack });
  }
};


export type PacksArgType = Partial<{
  packName: string
  min: number
  max: number
  sortPacks: string
  page: number
  pageCount: number
  user_id: string
}>

export type AddPackArgType = {
  name?: string
  deckCover?: string
  private?: boolean

}
export type UpdatePackResponseType = {
  updatedCardsPack: CardPacksType
  token: string
  tokenDeathTime: number
};

export type RemovePackResponseType = {
  deletedCardsPack: CardPacksType
  token: string
  tokenDeathTime: number
};

type CreatePackResponseType = {
  newCardsPack: CardPacksType
  token: string
  tokenDeathTime: number
};

export type PacksType = {
  cardPacks: CardPacksType[]
  cardPacksTotalCount: number
  maxCardsCount: number
  minCardsCount: number
  page: number
  pageCount: number
}


export type CardPacksType = {
  cardsCount: number
  created: string
  grade: number
  more_id: string
  name: string
  path: string
  private: boolean
  rating: number
  shots: number
  type: string
  updated: string
  user_id: string
  user_name: string
  __v: number
  _id: string
}

export type SearchParamsType = {
  min: number
  max: number
  page: number
  pageCount: number
  packName: string
  user_id: string
  sortPacks: string
}