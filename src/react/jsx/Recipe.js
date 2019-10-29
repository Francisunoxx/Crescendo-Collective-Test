import React from "react";
import style from "../css/Recipe.css";

//Redux
import { connect } from "react-redux";

const getRecipe = (recipes, uuid) => {
  return recipes.filter(item => item.uuid === uuid)[0];
};

const Recipe = props => {
  let hideShow = props.isRecipeModalVisible ? "flex" : "none";
  /*DESTRUCTURE*/
  const {
    images,
    title,
    description,
    postDate,
    prepTime,
    servings,
    cookTime
  } = getRecipe(props.recipes, props.recipeId);

  const { modalText } = props;

  let logo = "../../../public" + images.full;

  return (
    <div className={style.divRecipeContainer} style={{ display: hideShow }}>
      <div className={style.divRecipeBody}>
        <div className={style.divHeader}>
          <h4>{props.modalText}</h4>
          <p onClick={() => props.hideModal()}>&#10060;</p>
        </div>
        <div className={style.divBody}>
          <div className={style.divImage}>
            <img src={logo} />
          </div>
          <div className={style.divContainer}>
            <div className={style.divFirstRow}>
              <div>
                <label>Title</label>
                <input
                  type="text"
                  onChange={event => props.onChangeTitle(event)}
                  value={title}
                />
              </div>
              <div>
                <label>Preparation Time</label>
                <input
                  type="text"
                  onChange={event => props.onChangePreparationTime(event)}
                  value={prepTime}
                />
              </div>
            </div>
            <div className={style.divSecondRow}>
              <div>
                <label>Servings</label>
                <input
                  type="text"
                  onChange={event => props.onChangeServings(event)}
                  value={servings}
                />
              </div>
              <div>
                <label>Cook Time</label>
                <input
                  type="text"
                  onChange={event => props.onChangeCookTime(event)}
                  value={cookTime}
                />
              </div>
            </div>
            <div className={style.divThirdRow}>
              <div>
                <label>Description</label>
                <textarea
                  rows="2"
                  cols="50"
                  onChange={event => props.onChangeDescription(event)}
                  value={description}
                ></textarea>
              </div>
            </div>
          </div>
          <div className={style.divButton} style={{ display: hideShow }}>
            {modalText === "Edit Recipe" ? (
              <button onClick={() => props.onClickSaveRecipe(props.recipeId)}>Save</button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  recipes: state.reducerRecipe.recipes
});

export default connect(
  mapStateToProps,
  null
)(Recipe);
