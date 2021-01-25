import React, { Component } from "react";
import { Badge, Nav, Navbar } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mShow: false,
    };
  }
  render() {
    return (
      <>
        <Navbar bg="primary" variant="dark" fixed="top">
          <Navbar.Brand href="/">CLIQUOTE</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="products">
              Products
            </Nav.Link>
            <Nav.Link as={Link} to="cart">
              My Cart
              {this.props.totalQuantity !== 0 && (
                <sup>
                  <Badge pill variant="light">
                    {this.props.totalQuantity}
                  </Badge>
                </sup>
              )}
            </Nav.Link>
          </Nav>
        </Navbar>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    totalQuantity: state.totalQuantity,
  };
};
export default connect(mapStateToProps)(Header);
