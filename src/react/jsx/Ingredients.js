import React from "react";
import style from "../css/Ingredients.css";

const Ingredients = props => {
  let hideShow = props.isIngredientsModalVisible ? "flex" : "none";

  return (
    <div
      className={style.divIngredientsContainer}
      style={{ display: hideShow }}
    >
      <div className={style.divIngredientsBody}>
        <div className={style.divHeader}>
          <h4>Ingredients</h4>
          <p onClick={() => props.hideIngredientsModal()}>&#10060;</p>
        </div>
        <div className={style.divBody}>
          {props.specials.map(item => {
            return (
              <div>
                <h4>Type: {item.type}</h4>
                <h4>Title: {item.title}</h4>
                <h4>Geo: {item.geo}</h4>
                <h4>Text: {item.text}</h4>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Ingredients;
