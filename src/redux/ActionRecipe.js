import { GET_RECIPES, ADD_RECIPE, UPDATE_RECIPE, GET_SPECIALS } from "./ActionTypes";
import Axios from "axios";

export const getRecipes = () => dispatch => {
  Axios({
    url: "http://localhost:3001/recipes",
    method: "GET"
  })
    .then(result => result.data)
    .then(data =>
      dispatch({
        type: GET_RECIPES,
        payload: data
      })
    );
};

export const getSpecials = () => dispatch => {
  Axios({
    url: "http://localhost:3001/specials",
    method: "GET"
  })
    .then(result => result.data)
    .then(data =>
      dispatch({
        type: GET_SPECIALS,
        payload: data
      })
    );
};

export const addRecipe = data => dispatch => {
  Axios({
    url: "http://localhost:3001/recipes",
    method: "POST",
    data: data
  })
    .then(result => result.data)
    .then(() =>
      dispatch({
        type: ADD_RECIPE,
        payload: {
          Message: "Successful adding"
        }
      })
    );
};

export const updateRecipe = (uuid, data) => dispatch => {
  Axios({
    url: "http://localhost:3001/recipes/" + uuid,
    method: "PATCH",
    data: data
  })
    .then(result => result.data)
    .then(() =>
      dispatch({
        type: UPDATE_RECIPE,
        payload: {
          Message: "Successful updating"
        }
      })
    );
};
