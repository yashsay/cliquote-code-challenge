import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../../views/Home/Home";
import Products from "../../views/Products/Products";
import Cart from "../../views/Cart/Cart";

class MainContent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <div className={"body"}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/products" component={Products} />
            <Route path="/cart" component={Cart} />
          </Switch>
        </div>
      </>
    );
  }
}

export default MainContent;
