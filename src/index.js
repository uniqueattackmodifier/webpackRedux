import { createStore, applyMiddleware } from "redux";
import React from "react";
import ReactDOM, { render } from "react-dom";
import logger from "redux-logger";
import { Provider } from "react-redux";

import BookList from "./components/pages/bookList";
import rootReducer from "./reducers";
import { postBooks, deleteBook, updateBook } from "./actions/booksActions";
import Menu from "./components/menu";

const middleware = applyMiddleware(logger);

const store = createStore(rootReducer, middleware);

render(
  <Provider store={store}>
    <div>
      <Menu />
      <BookList />
    </div>
  </Provider>,
  document.getElementById("app")
);


store.dispatch({
  type: "ADD_TO_CART",
  payload: { id: 2 }
});
