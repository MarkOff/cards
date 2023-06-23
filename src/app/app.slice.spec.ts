import { appReducer, appActions } from "./app.slice";


describe("appReducer", () => {
  const initialState = {
    error: null,
    isLoading: false,
    isAppInitialized: false,
    users: [],
    isInitialize: false
  };

  it("should handle setIsLoading function", () => {
    const newState = appReducer(initialState, appActions.setIsLoading({ isLoading: true }));
    expect(newState.isLoading).toEqual(true);
  });

  it("should handle setAppError function", () => {
    const mockError = "Test error message";
    const newState = appReducer(initialState, appActions.setAppError({ error: mockError }));
    expect(newState.error).toEqual(mockError);
  });

  it("should change state after isInitializeApp fulfilled", () => {
    const newState = appReducer(initialState, { type: "auth/isInitialize/fulfilled" });
    expect(newState.isInitialize).toEqual(true);
  });

  it("should change state after isInitializeApp rejected", () => {
    const newState = appReducer(initialState, { type: "auth/isInitialize/rejected" });
    expect(newState.isInitialize).toEqual(true);
  });
  it("should change state after fulfilled action", () => {
    const testAction = { type: "testAction/fulfilled" };
    const newState = appReducer(initialState, testAction);
    expect(newState.isLoading).toEqual(false);
  });
});