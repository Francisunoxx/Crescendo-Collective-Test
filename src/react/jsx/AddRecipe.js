import React from "react";
import style from "../css/AddRecipe.css";

const AddRecipe = props => {
  let hideShow = props.isRecipeModalVisible ? "flex" : "none";

  return (
    <div className={style.divRecipeContainer} style={{ display: hideShow }}>
      <div className={style.divRecipeBody}>
        <div className={style.divHeader}>
          <h4>{props.modalText}</h4>
          <p onClick={() => props.hideModal()}>&#10060;</p>
        </div>
        <div className={style.divBody}>
          <div className={style.divContainer}>
            <div className={style.divFirstRow}>
              <div>
                <label>Title</label>
                <input
                  type="text"
                  onChange={event => props.onChangeTitle(event)}
                />
              </div>
              <div>
                <label>Preparation Time</label>
                <input
                  type="text"
                  onChange={event => props.onChangePreparationTime(event)}
                />
              </div>
            </div>
            <div className={style.divSecondRow}>
              <div>
                <label>Servings</label>
                <input
                  type="text"
                  onChange={event => props.onChangeServings(event)}
                />
              </div>
              <div>
                <label>Cook Time</label>
                <input
                  type="text"
                  onChange={event => props.onChangeCookTime(event)}
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
                ></textarea>
              </div>
            </div>
          </div>
          <div className={style.divButton} style={{ display: hideShow }}>
            <button onClick={() => props.onClickAddRecipe()}>Add</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRecipe;
