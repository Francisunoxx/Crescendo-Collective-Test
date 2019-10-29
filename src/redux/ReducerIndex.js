import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import ReducerRecipe from "./ReducerRecipe";

export default history =>
  combineReducers({
    router: connectRouter(history),
    reducerRecipe: ReducerRecipe
  });
