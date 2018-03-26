import { combineReducers } from 'redux'
import {cartReducer} from './cartReducer'
import {booksReducers} from './bookReducer'


const rootReducer = combineReducers({
  books: booksReducers,
  cart: cartReducer
})


export default rootReducer