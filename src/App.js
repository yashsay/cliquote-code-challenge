import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore } from "redux";
import DefaultLayout from "./containers/DefaultLayout/DefaultLayout";
import Reducer from "./reducers/Reducer";

const store = createStore(Reducer);
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <DefaultLayout />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
