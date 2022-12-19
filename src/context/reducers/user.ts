interface initialState {
  currentUser: null;
}

// TODO: Set action type
export const userReducer = (state: initialState, action: any) => {
  return {
    ...state,
    currentUser: action.currentUser,
  };
};
