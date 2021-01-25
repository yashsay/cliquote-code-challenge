import React, { Component } from "react";
import {
  Badge,
  Button,
  ButtonGroup,
  ButtonToolbar,
  ListGroup,
} from "react-bootstrap";
import {
  removeItem,
  addQuantity,
  subtractQuantity,
  toggleDiscount,
} from "../../actions/Actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      promoCodes: [],
    };
    this.init = this.init.bind(this);
    this.subtractQuantity = this.subtractQuantity.bind(this);
    this.addQuantity = this.addQuantity.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.toggleDiscount = this.toggleDiscount.bind(this);
  }

  componentDidMount() {
    this.init();
  }

  removeItem(item) {
    this.props.removeItem(item.id);
  }

  addQuantity(item) {
    this.props.addQuantity(item.id);
  }

  subtractQuantity(item) {
    this.props.subtractQuantity(item.id);
  }

  toggleDiscount(item) {
    this.props.toggleDiscount(item);
  }

  init() {
    this.setState({
      promoCodes: [
        {
          promoCode: "RRD4D32",
          name: "10% Discount",
          id: 1,
          description: "10% discount for orders above $5000 (pre-discount)",
          value: 10,
          baseCriteriaValue: 5000,
          isActive: true,
        },
        {
          promoCode: "44F4T11",
          name: "15% Discount",
          id: 2,
          description: "15% discount for orders above $10000 (pre-discount)",
          value: 15,
          baseCriteriaValue: 10000,
          isActive: true,
        },
      ],
    });
  }

  render() {
    return (
      <>
        <div style={{ marginTop: "5rem" }}>
          <h1 style={{ textAlign: "center", margin: "2rem" }}>Cart</h1>
          <div
            style={{
              display: "inline-flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <ListGroup>
              {this.props.items.length > 0 ? (
                this.props.items.map((item, index) => (
                  <ListGroup.Item key={item.id}>
                    <div
                      style={{
                        display: "inline-flex",
                        justifyContent: "space-around",
                      }}
                    >
                      <div className="item-img">
                        <img
                          src={item.image}
                          alt={item.image}
                          className=""
                          style={{ height: "150px" }}
                        />
                      </div>
                      <div className="item-desc" style={{ marginLeft: "1rem" }}>
                        <h5 style={{ fontWeight: "500" }}>
                          {item.displayName}&nbsp;({item.productId})
                        </h5>
                        <div>{item.productDescription}</div>
                        <div>
                          <span style={{ fontWeight: "500" }}>Price: </span>{" "}
                          <Badge pill variant="dark">
                            ${item.cost}
                          </Badge>
                        </div>
                        <div>
                          <span style={{ fontWeight: "500" }}>
                            Quantity: {item.quantity}
                          </span>{" "}
                        </div>
                        <br />
                        <div>
                          <ButtonToolbar aria-label="Toolbar with button groups">
                            <ButtonGroup
                              className="mr-2"
                              aria-label="First group"
                              size="sm"
                            >
                              <Button
                                variant="primary"
                                onClick={() => this.subtractQuantity(item)}
                              >
                                &#9660;
                              </Button>
                            </ButtonGroup>
                            <ButtonGroup
                              className="mr-2"
                              aria-label="Second group"
                              size="sm"
                            >
                              <Button
                                variant="primary"
                                onClick={() => this.addQuantity(item)}
                              >
                                &#9650;
                              </Button>
                            </ButtonGroup>
                            <ButtonGroup aria-label="Third group" size="sm">
                              <Button
                                variant="danger"
                                onClick={() => this.removeItem(item)}
                              >
                                Remove
                              </Button>
                            </ButtonGroup>
                          </ButtonToolbar>
                        </div>
                      </div>
                    </div>
                  </ListGroup.Item>
                ))
              ) : (
                <div>
                  <div
                    style={{
                      display: "inline-flex",
                      justifyContent: "space-around",
                    }}
                  >
                    Your cart is empty! &nbsp;{" "}
                    <Link to={"/products"}>(Browse Product Catalogue)</Link>
                  </div>
                </div>
              )}
            </ListGroup>
          </div>
          {this.props.items.length > 0 && (
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  display: "inline-flex",
                  justifyContent: "space-evenly",
                  width: "100%",
                  marginTop: "1rem",
                }}
              >
                {this.state.promoCodes.length > 0 && (
                  <ListGroup>
                    <h4>
                      Cart Total: ${this.props.discountedTotal.toFixed(2)}
                    </h4>
                    <h5>Promo Codes</h5>
                    <span style={{ fontSize: "12px", marginBottom: "5px" }}>
                      (Click to apply)
                    </span>
                    {this.state.promoCodes.map((item, index) => (
                      <ListGroup.Item
                        key={item.id}
                        disabled={this.props.actualTotal < 5000 ? true : this.props.actualTotal < 10000 &&
                          item.baseCriteriaValue === 10000 ? true : false}
                        action
                        active={
                          this.props.appliedDiscount !== null &&
                          this.props.appliedDiscount.id === item.id
                        }
                        onClick={() => this.toggleDiscount(item)}
                      >
                        <div
                          style={{
                            justifyContent: "space-around",
                          }}
                        >
                          <div className="promo-header">
                            <h6>
                              {item.name} [{item.promoCode}]&nbsp;
                              {this.props.appliedDiscount !== null &&
                              this.props.appliedDiscount.id === item.id ? (
                                <Badge variant={"success"}>Applied</Badge>
                              ) : null}
                              {this.props.actualTotal < 5000 ? (
                                <Badge variant={"danger"}>Not Applicable</Badge>
                              ) : this.props.actualTotal < 10000 &&
                                item.baseCriteriaValue === 10000 ? (
                                <Badge variant={"danger"}>Not Applicable</Badge>
                              ) : null}
                              {/* <Badge variant={"danger"}>Not Applicable</Badge> */}
                            </h6>
                          </div>
                          <div className="promo-description">
                            <p>{item.description}</p>
                          </div>
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </div>
              <div style={{ marginTop: "1rem" }}>
                <Button variant="primary">CHECKOUT</Button>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.addedItems,
    actualTotal: state.actualTotal,
    discountedTotal: state.discountedTotal,
    appliedDiscount: state.appliedDiscount,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    removeItem: (id) => {
      dispatch(removeItem(id));
    },
    addQuantity: (id) => {
      dispatch(addQuantity(id));
    },
    subtractQuantity: (id) => {
      dispatch(subtractQuantity(id));
    },
    toggleDiscount: (item) => {
      dispatch(toggleDiscount(item));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
