import { packReducer, packThunks } from "features/packs/packs.slice";
import { SearchParamsType, CardPacksType, PacksType, PacksArgType } from "features/packs/packs.api";

describe("packsReducer", () => {
  const initialState = {
    packs: {} as PacksType,
    searchParams: {
      packName: "",
      min: 0,
      max: 121,
      sortPacks: "0updated",
      page: 1,
      pageCount: 5,
      user_id: "",
    } as SearchParamsType,
  };


  const packsPage = {
    cardPacks: [] as CardPacksType[],
    cardPacksTotalCount: 1889,
    maxCardsCount: 121,
    minCardsCount: 0,
    page: 1,
    pageCount: 5
  };

  it("should fetchPacks work correctly", () => {
    const action = packThunks.fetchPacks.fulfilled(packsPage , "requestId", initialState as PacksArgType);

    const state = packReducer(initialState, action);

    expect(state.packs.cardPacks).toEqual(packsPage.cardPacks);
    expect(state.searchParams.page).toEqual(packsPage.page);
    expect(state.searchParams.pageCount).toEqual(packsPage.pageCount);
    expect(state.searchParams.max).toEqual(packsPage.maxCardsCount); // `state.maxCardsCount` должно быть `state.searchParams.max`
    expect(state.searchParams.min).toEqual(packsPage.minCardsCount); // `state.minCardsCount` должно быть `state.searchParams.min`
  });
});