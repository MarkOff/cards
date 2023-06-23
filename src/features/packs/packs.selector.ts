import { RootState } from "app/store";

export const selectCardPacks = (state: RootState) => state.pack.packs.cardPacks
export const selectMin = (state: RootState) => state.pack.searchParams.min
export const selectMax = (state: RootState) => state.pack.searchParams.max
export const selectPage = (state: RootState) => state.pack.searchParams.page
export const selectPageCount = (state: RootState) => state.pack.searchParams.pageCount
export const selectNamePack = (state: RootState) =>  state.pack.searchParams.packName
export const selectUserId = (state: RootState) =>  state.pack.searchParams.user_id
export const selectSortPacks = (state: RootState) =>  state.pack.searchParams.sortPacks
export const selectAllPacks = (state: RootState) =>  state.pack.packs.cardPacksTotalCount