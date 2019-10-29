import {
  GET_RECIPES,
  ADD_RECIPE,
  UPDATE_RECIPE,
  GET_SPECIALS
} from "./ActionTypes";

const initialState = {
  recipes: [],
  specials: {},
  transaction: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload
      };
    case ADD_RECIPE:
      return {
        ...state,
        transaction: action.payload
      };
    case UPDATE_RECIPE:
      return {
        ...state,
        transaction: action.payload
      };
    case GET_SPECIALS:
      return {
        ...state,
        specials: action.payload
      };
    default:
      return state;
  }
}
