import React, { Component } from "react";
import { Button } from "react-bootstrap";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <div style={{ marginTop: "5rem" }}>
          <h1>Welcome to Cliquote Mart!</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <br />
          <Button
            variant="primary"
            onClick={() => this.props.history.push("/products")}
          >
            Browse Products
          </Button>
        </div>
      </>
    );
  }
}

export default Home;
