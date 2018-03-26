import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Grid, Row, Col } from "react-bootstrap";
import { getBooks } from "../../actions/booksActions";

import BookItem from "./bookItem";
import BooksForm from "./booksForm";
import Cart from './cart'

class BookList extends Component {
  componentDidMount = () => {
    this.props.getBooks();
  };

  render() {
    const booklist = this.props.books.map(book => {
      return (
        <Col xs={12} sm={6} md={4} key={book._id}>
          <BookItem
            _id={book._id}
            title={book.title}
            description={book.description}
            price={book.price}
          />
        </Col>
      );
    });
    return (
      <Grid>
        
        <Row>
          <Col xs={12} sm={6}>
            <BooksForm />
          </Col>
          {booklist}
        </Row>
        <Row>
          <Cart />
          </Row>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {
    books: state.books.books
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getBooks: getBooks }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BookList);
