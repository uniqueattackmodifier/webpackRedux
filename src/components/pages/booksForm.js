import React, { Component } from "react";
import {
  Well,
  Panel,
  FormGroup,
  FormControl,
  ControlLabel,
  Button
} from "react-bootstrap";
import { findDOMNode } from "react-dom";

import { postBooks, deleteBook } from "../../actions/booksActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class BooksForm extends Component {
  handleSubmit = () => {
    const book = [
      {
        title: findDOMNode(this.refs.title).value,
        description: findDOMNode(this.refs.description).value,
        price: findDOMNode(this.refs.price).value
      }
    ];

    this.props.postBooks(book);
  };

  onDelete() {
    let bookId = findDOMNode(this.refs.delete).value;

    this.props.deleteBook(bookId);
  }

  render() {
    const bookList = this.props.books.map(item => {
      return <option key={item._id}>{item._id}</option>;
    });

    return (
      <Well>
        <Panel>
          <FormGroup controlId="title">
            <ControlLabel>Title</ControlLabel>
            <FormControl type="text" placeholder="enter title" ref="title" />
          </FormGroup>
          <FormGroup controlId="description">
            <ControlLabel>Description</ControlLabel>
            <FormControl
              type="text"
              placeholder="enter description"
              ref="description"
            />
          </FormGroup>
          <FormGroup controlId="price">
            <ControlLabel>Price</ControlLabel>
            <FormControl type="text" placeholder="enter price" ref="price" />
          </FormGroup>
          <Button onClick={this.handleSubmit}>add</Button>
        </Panel>

        <Panel style={{ marginTop: "25px" }}>
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>select a book</ControlLabel>
            <FormControl ref="delete" componentClass="select" placeholder='select' >
            <option value='select'>select</option>
            {bookList}
            </FormControl>
          </FormGroup>
          <Button onClick={this.onDelete.bind(this)} bsStyle="danger">
            delete
          </Button>
        </Panel>
      </Well>
    );
  }
}

function mapStateToProps(state) {
  return {
    books: state.books.books
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ postBooks, deleteBook }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksForm);
