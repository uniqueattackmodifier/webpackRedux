export function cartReducer(state = { cart: [] }, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: action.payload,
        totalAmount: totals(action.payload).amount,
        totalQty: totals(action.payload).qty
      };
    case "DELETE_CART_ITEM":
      return {
        ...state,
        cart: action.payload,
        totalAmount: totals(action.payload).amount,
        totalQty: totals(action.payload).qty
      };
    case "UPDATE_CART":
      const currentBookToUpdate = [...state.cart];
      const indexToUpdate = currentBookToUpdate.findIndex(book => {
        return book._id === action._id;
      });
      const newBookToUpdate = {
        ...currentBookToUpdate[indexToUpdate],
        quantity: currentBookToUpdate[indexToUpdate].quantity + action.unit
      };
      let cartUpdate = [
        ...currentBookToUpdate.slice(0, indexToUpdate),
        newBookToUpdate,
        ...currentBookToUpdate.slice(indexToUpdate + 1)
      ];
      return {
        ...state,
        cart: cartUpdate,
        totalAmount: totals(cartUpdate).amount,
        totalQty: totals(cartUpdate).qty
      };
    default:
      return state;
  }
}

//total

export function totals(payloadArr) {
  const totalAmount = Object.values(payloadArr)
    .map(function(CartArr) {
      return CartArr.price * CartArr.quantity;
    })
    .reduce(function(a, b) {
      return a + b;
    }, 0);

  const totalQty = Object.values(payloadArr).map(item => {
      return item.quantity;
    })
    .reduce((a, b) => {
      return a + b;
    }, 0);

  return { amount: totalAmount.toFixed(2), qty: totalQty };
}
