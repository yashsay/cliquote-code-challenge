import React, { Component } from "react";
// import { Button, Card } from "react-bootstrap";
import Cards from "../../components/Cards/Cards";
import { connect } from "react-redux";
import { addToCart } from "../../actions/Actions";
import { Alert } from "react-bootstrap";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAddedItem: "",
      showAlert: false,
    };
    this.addToCart = this.addToCart.bind(this);
  }

  addToCart(item) {
    console.log("Add to Cart: ", item);
    this.setState({
      ...this.state,
      currentAddedItem: item.displayName,
      showAlert: true,
    });
    setTimeout(() => {
      this.setState({ showAlert: false });
    }, 1000);
    this.props.addToCart(item.id);
  }

  render() {
    return (
      <>
        <div style={{ marginTop: "5rem", marginBottom: "5rem" }}>
          <h1 style={{ textAlign: "center", margin: "2rem" }}>Our Products</h1>
          <div
            style={{
              display: "inline-flex",
              justifyContent: "space-evenly",
              width: "100%",
            }}
          >
            {this.props.items && this.props.items.length > 0 ? (
              this.props.items.map((item, index) => (
                <Cards
                  key={item.id}
                  cardData={item}
                  addToCartClick={this.addToCart}
                />
              ))
            ) : (
              <div style={{ textAlign: "center", fontWeight: "500" }}>
                {/* No Products available! */}
              </div>
            )}
          </div>
        </div>
        <Alert
          variant={"success"}
          dismissible
          show={this.state.showAlert}
          onClose={() => this.setState({ showAlert: false })}
        >
          Item added to cart successfully!
        </Alert>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.items,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id) => {
      dispatch(addToCart(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
