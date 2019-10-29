import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./react/jsx/Home";
import style from "./react/css/Routes.css";

class Routes extends Component {
  render() {
    return (
      <div className={style.divRoute}>
        <BrowserRouter>
          <Route exact path="/" component={Home} />
        </BrowserRouter>
      </div>
    );
  }
}

export default Routes;
