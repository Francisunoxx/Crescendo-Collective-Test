import React, { Component } from "react";
import style from "../css/Home.css";
import Icon from "../assets/Task.svg";
import Recipe from "./Recipe";
import NewRecipe from "./AddRecipe";
import Ingredients from "./Ingredients";
import _ from "lodash";

//Redux
import { connect } from "react-redux";
import {
  getRecipes,
  addRecipe,
  updateRecipe,
  getSpecials
} from "../../redux/ActionRecipe";

const AddRecipe = "AddRecipe";
const ViewRecipe = "ViewRecipe";
const EditRecipe = "EditRecipe";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipe: [],
      recipeId: "",
      modalText: "",
      isRecipeModalVisible: false,
      isIngredientsModalVisible: false,
      recipe: {
        title: "",
        servings: "",
        prepTime: "",
        cookTime: "",
        description: ""
      },
      specials: []
    };

    /*BINDING LISTERS TO CONSTRUCTOR*/
    this.onClickRecipe = this.onClickRecipe.bind(this);
    this.onClickAddRecipe = this.onClickAddRecipe.bind(this);
    this.onClickSaveRecipe = this.onClickSaveRecipe.bind(this);
    this.onClickViewIngredients = this.onClickViewIngredients.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.hideIngredientsModal = this.hideIngredientsModal.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeServings = this.onChangeServings.bind(this);
    this.onChangePreparationTime = this.onChangePreparationTime.bind(this);
    this.onChangeCookTime = this.onChangeCookTime.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
  }

  componentDidMount() {
    //Get all recipes after mounting
    this.props.getRecipes();
    this.props.getSpecials();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.recipes === this.props.recipes) {
      this.props.getRecipes();
    } else if (prevProps.recipes !== this.props.recipes) {
    }
  }

  onClickRecipe(module, recipeId) {
    if (module === AddRecipe) {
      this.setState({
        modalText: "Add Recipe"
      });
    } else if (module == EditRecipe) {
      this.setState({
        modalText: "Edit Recipe",
        recipeId: recipeId
      });
    } else if (module == ViewRecipe) {
      this.setState({
        modalText: "View Recipe",
        recipeId: recipeId
      });
    }

    if (this.state.isRecipeModalVisible === false) {
      this.setState({
        isRecipeModalVisible: true
      });
    }
  }

  onChangeTitle(event) {
    this.setState({
      recipe: {
        ...this.state.recipe,
        title: event.target.value
      }
    });
  }

  onChangeServings(event) {
    this.setState({
      recipe: {
        ...this.state.recipe,
        servings: event.target.value
      }
    });
  }

  onChangePreparationTime(event) {
    this.setState({
      recipe: {
        ...this.state.recipe,
        prepTime: event.target.value
      }
    });
  }

  onChangeCookTime(event) {
    this.setState({
      recipe: {
        ...this.state.recipe,
        cookTime: event.target.value
      }
    });
  }

  onChangeDescription(event) {
    this.setState({
      recipe: {
        ...this.state.recipe,
        description: event.target.value
      }
    });
  }

  hideModal() {
    this.setState({
      isRecipeModalVisible: false
    });
  }

  /*CREATING NEW RECIPE*/
  onClickAddRecipe() {
    const data = {
      uuid: (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1),
      images: {
        full: "/img/goulash.jpg"
      },
      title: this.state.recipe.title,
      description: this.state.recipe.description,
      servings: this.state.recipe.servings,
      prepTime: this.state.recipe.prepTime,
      cookTime: this.state.recipe.cookTime,
      postDate: new Date(),
      editDate: "",
      ingredients: [
        {
          uuid: "62798278-2fbc-4c31-98de-b7959c191688",
          amount: 1,
          measurement: "package (19 oz)",
          name: "queso brats"
        }
      ]
    };

    //Call props adding of recipe
    this.props.addRecipe(data);
    //Call props of all recipes
    this.props.getRecipes();
  }

  getSelectedRecipe(recipeId) {
    return this.props.recipes.filter(item => item.uuid == recipeId)[0];
  }

  /*UPDATING RECIPE*/
  onClickSaveRecipe(recipeId) {
    //Getting selected recipe
    const recipe = this.getSelectedRecipe(recipeId);
    //Data for PATCH API
    const data = {};

    if (
      !_.isEqual(recipe.title, this.state.recipe.title) &&
      this.state.recipe.title !== ""
    ) {
      data["title"] = this.state.recipe.title;
    }

    if (
      !_.isEqual(recipe.servings, this.state.recipe.servings) &&
      this.state.recipe.servings !== ""
    ) {
      data["servings"] = this.state.recipe.servings;
    }

    if (
      !_.isEqual(recipe.prepTime, this.state.recipe.prepTime) &&
      this.state.recipe.prepTime !== ""
    ) {
      data["prepTime"] = this.state.recipe.prepTime;
    }

    if (
      !_.isEqual(recipe.cookTime, this.state.recipe.cookTime) &&
      this.state.recipe.cookTime !== ""
    ) {
      data["cookTime"] = this.state.recipe.cookTime;
    }

    if (
      !_.isEqual(recipe.description, this.state.recipe.description) &&
      this.state.recipe.description !== ""
    ) {
      data["description"] = this.state.recipe.description;
    }

    //Update recipe
    this.props.updateRecipe(recipeId, data);
  }

  onClickViewIngredients(recipeId) {
    //Getting selected recipe
    const recipe = this.getSelectedRecipe(recipeId);
    let specialArray = [];

    //Get recipe based on ingreident id
    recipe.ingredients.map(item => {
      this.props.specials.map(specialItem => {
        if(specialItem.ingredientId == item.uuid){
          specialArray.push(specialItem);
        }
      });
    });

    this.setState({
      isIngredientsModalVisible: true,
      recipe: recipe,
      recipeId: recipeId,
      specials: specialArray
    });
  }

  hideIngredientsModal() {
    if (this.state.isIngredientsModalVisible == false) {
      this.setState({
        isIngredientsModalVisible: true
      });
    } else {
      this.setState({
        isIngredientsModalVisible: false
      });
    }
  }

  render() {
    return (
      <div className={style.divContainer}>
        <div className={style.divRecipesContainer}>
          <div className={style.divHeader}>
            <img src={Icon} />
            <h3>Recipes</h3>
            <button onClick={() => this.onClickRecipe(AddRecipe)}>
              Add Recipe
            </button>
          </div>
          <div className={style.divBody}>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.props.recipes.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.uuid}</td>
                      <td>{item.title}</td>
                      <td>
                        <div className={style.divActions}>
                          <button
                            className={`${style.actions} ${style.viewRecipe}`} /*STYLE OVER-RIDING*/
                            onClick={() =>
                              this.onClickRecipe(ViewRecipe, item.uuid)
                            }
                          >
                            View Recipe
                          </button>
                          <button
                            className={`${style.actions} ${style.editRecipe}`}
                            onClick={() =>
                              this.onClickRecipe(EditRecipe, item.uuid)
                            }
                          >
                            Edit Recipe
                          </button>
                          <button
                            className={`${style.actions} ${style.viewIngredients}`}
                            onClick={() =>
                              this.onClickViewIngredients(item.uuid)
                            }
                          >
                            View Ingredients
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {(this.state.isRecipeModalVisible &&
          this.state.modalText === "View Recipe") ||
        this.state.modalText === "Edit Recipe" ? (
          <Recipe
            modalText={this.state.modalText}
            isRecipeModalVisible={this.state.isRecipeModalVisible}
            hideModal={this.hideModal}
            recipeId={this.state.recipeId}
            onClickSaveRecipe={this.onClickSaveRecipe}
            onChangeTitle={this.onChangeTitle}
            onChangeServings={this.onChangeServings}
            onChangePreparationTime={this.onChangePreparationTime}
            onChangeCookTime={this.onChangeCookTime}
            onChangeDescription={this.onChangeDescription}
          />
        ) : (
          ""
        )}

        {this.state.isRecipeModalVisible &&
        this.state.modalText === "Add Recipe" ? (
          <NewRecipe
            modalText={this.state.modalText}
            isRecipeModalVisible={this.state.isRecipeModalVisible}
            hideModal={this.hideModal}
            onClickAddRecipe={this.onClickAddRecipe}
            onChangeTitle={this.onChangeTitle}
            onChangeServings={this.onChangeServings}
            onChangePreparationTime={this.onChangePreparationTime}
            onChangeCookTime={this.onChangeCookTime}
            onChangeDescription={this.onChangeDescription}
          />
        ) : (
          ""
        )}

        {this.state.isIngredientsModalVisible ? (
          <Ingredients
            recipeId={this.state.recipeId}
            isIngredientsModalVisible={this.state.isIngredientsModalVisible}
            onClickViewIngredients={this.onClickViewIngredients}
            recipe={this.state.recipe}
            hideIngredientsModal={this.hideIngredientsModal}
            specials={this.state.specials}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

//Mapping state to props
const mapStateToProps = state => ({
  recipes: state.reducerRecipe.recipes,
  specials: state.reducerRecipe.specials
});

//Mapping redux methods to props
const mapDispatchToProps = dispatch => {
  return {
    getRecipes: () => dispatch(getRecipes()),
    getSpecials: () => dispatch(getSpecials()),
    addRecipe: data => dispatch(addRecipe(data)),
    updateRecipe: (recipeId, data) => dispatch(updateRecipe(recipeId, data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
