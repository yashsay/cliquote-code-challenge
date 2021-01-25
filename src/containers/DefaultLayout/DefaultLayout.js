import React, { Component } from "react";
import Header from "../Header/Header";
import MainContent from "../MainContent/MainContent";

class DefaultLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <Header />
        <MainContent />
      </>
    );
  }
}

export default DefaultLayout;
