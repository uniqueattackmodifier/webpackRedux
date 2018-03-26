import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Row,
  Panel,
  Col,
  Well,
  Button,
  ButtonGroup,
  Label,
  Modal
} from "react-bootstrap";
import { bindActionCreators } from "redux";
import { deleteCartItem, updateCart } from "../../actions/cartActions";

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false
    };
  }

  open() {
    this.setState({
      showModal: true
    });
  }

  close() {
    this.setState({
      showModal: false
    });
  }

  onDelete(_id) {
    const currentBookToDelete = this.props.cart;

    const indexToDelete = currentBookToDelete.findIndex(function(cart) {
      return cart._id === _id;
    });

    let cartAfterDelete = [
      ...currentBookToDelete.slice(0, indexToDelete),
      currentBookToDelete.slice(indexToDelete + 1)
    ];

    this.props.deleteCartItem(cartAfterDelete);
  }

  onIncrement(_id) {
    this.props.updateCart(_id, 1);
  }

  onDecrement(_id, quantity) {
    if (quantity > 1) {
      this.props.updateCart(_id, -1);
    }
  }

  render() {
    if (this.props.cart[0]) {
      return this.renderCart();
    } else {
      return this.renderEmpty();
    }
  }
  renderEmpty() {
    return <div>empty</div>;
  }
  renderCart() {
    const cartItemList = this.props.cart.map(item => {
      return (
        <Panel key={item._id}>
          <Row>
            <Col xs={12} sm={4}>
              <h6>{item.title}</h6>
              <span> </span>
            </Col>
            <Col xs={12} sm={2}>
              <h6>usd. {item.price}</h6>
            </Col>
            <Col xs={12} sm={2}>
              <h6>
                qty. <Label bsStyle="success">{item.quantity}</Label>
              </h6>
            </Col>
            <Col xs={6} sm={4}>
              <ButtonGroup style={{ minWidth: "300px" }}>
                <Button
                  onClick={this.onDecrement.bind(this, item._id, item.quantity)}
                  bsStyle="default"
                  bsSize="small"
                >
                  -
                </Button>
                <Button
                  onClick={this.onIncrement.bind(this, item._id)}
                  bsStyle="default"
                  bsSize="small"
                >
                  +
                </Button>
                <span> </span>
                <Button
                  onClick={this.onDelete.bind(this, item._id)}
                  bsStyle="danger"
                  bsSize="small"
                >
                  remove
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
        </Panel>
      );
    }, this);
    return (
      <Panel header="Cart" bsStyle="primary">
        {cartItemList}
        <Row>
          <Col xs={12}>
            <h6>total ammount: {this.props.totalAmount} </h6>
            <Button
              onClick={this.open.bind(this)}
              bsStyle="success"
              bsSize="small"
            >
              proceed to checkout
            </Button>
          </Col>
        </Row>
        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>thank you</Modal.Title>
          </Modal.Header>
          <Modal.Body />
          <h6>modal</h6>
          <Modal.Footer>
            <Col xs={6}>
              <h6>total $: {this.props.totalAmount} </h6>
            </Col>
            <Button onClick={this.close.bind(this)}>close</Button>
          </Modal.Footer>
        </Modal>
      </Panel>
    );
  }
}
function mapStateToProps(state) {
  return {
    cart: state.cart.cart,
    totalAmount: state.cart.totalAmount
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      deleteCartItem: deleteCartItem,
      updateCart: updateCart
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
