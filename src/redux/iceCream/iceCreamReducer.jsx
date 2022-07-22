import { BUY_ICECREAM } from "./iceCreamType";
const initialState = {
  numOfIcecream: 20,
};
export const iceCreamReducer = (state = initialState, action) => {
  switch (action.type) {
    case BUY_ICECREAM:
      return {
        ...state,
        numOfIcecream: state.numOfIcecream - 1,
      };
    default:
      return state;
  }
};
