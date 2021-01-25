import React, { Component } from "react";
import { Badge, Button, Card } from "react-bootstrap";

class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={this.props.cardData.image} />
        <Card.Body>
          <Card.Title>
            {this.props.cardData.displayName}
            <br /> ({this.props.cardData.productId})
          </Card.Title>
          <Card.Text>
            {this.props.cardData.productDescription} <br />
            <span style={{ fontWeight: "500" }}>Price: </span>{" "}
            <Badge pill variant="dark">
              ${this.props.cardData.cost}
            </Badge>
          </Card.Text>
          <Button
            variant="primary"
            onClick={(e) => this.props.addToCartClick(this.props.cardData)}
          >
            + Add to Cart
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

export default Cards;
