import * as actionTypes from "../constants/cartConstants";

const CART_INITIAL_STATE = {
  cartItems: [],
  itemsCount: 0,
  cartSubtotal: 0,
};

export const cartReducer = (state = CART_INITIAL_STATE, action) => {
  switch (action.type) {
    // V1
    case actionTypes.ADD_TO_CART:
      const productBeingAddedToCart = action.payload;
      const currentState = { ...state };

      // Find the cartProduct with the same _id as the one being added to the cart
      const cartProductIndex = state.cartItems.findIndex(
        (x) =>
          x.cartProducts[0]._id === productBeingAddedToCart.cartProducts[0]._id
      );

      if (cartProductIndex >= 0) {
        // If the cartProduct exists, increase its quantity
        const updatedCartItems = [...state.cartItems];
        updatedCartItems[cartProductIndex].cartProducts[0].quantity =
          Number(updatedCartItems[cartProductIndex].cartProducts[0].quantity) +
          Number(productBeingAddedToCart.cartProducts[0].quantity);

        currentState.cartItems = updatedCartItems;
      } else {
        // If the cartProduct doesn't exist, add a new cartItem to the cartItems array
        currentState.cartItems = [
          ...state.cartItems,
          {
            cartProducts: productBeingAddedToCart.cartProducts,
            ctlsku: productBeingAddedToCart.ctlsku,
            image: productBeingAddedToCart.image,
            name: productBeingAddedToCart.name,
            price: productBeingAddedToCart.price,
            productID: productBeingAddedToCart.productID,
          },
        ];
      }

      // Update itemsCount and cartSubtotal
      let itemsCount = 0;
      let cartSubtotal = 0;

      
      currentState.cartItems.forEach((cartItem) => {
        cartItem.cartProducts.forEach((product) => {
          itemsCount += Number(product.quantity);
          cartSubtotal +=
            parseFloat(product.quantity) * parseFloat(product.price);
        });
      });

      currentState.itemsCount = itemsCount;
      currentState.cartSubtotal = cartSubtotal;

      return currentState;

    // V1
    case actionTypes.REMOVE_FROM_CART:
      const updatedCartItems = state.cartItems.filter(
        (x) => x.cartProducts[0]._id !== action.payload.id
      );
      const removedItem = state.cartItems.find(
        (x) => x.cartProducts[0]._id === action.payload.id
      );
      return {
        ...state,
        cartItems: updatedCartItems,
        itemsCount: Number(state.itemsCount - action.payload.quantity),
        cartSubtotal:
          state.cartSubtotal - action.payload.price * action.payload.quantity,
        removedItem: removedItem,
      };

    // In cartReducers.js
    case actionTypes.EDIT_QUANTITY:
      const updatedCartItemsQuantity = state.cartItems.map((item) => {
        if (item.cartProducts[0]._id === action.payload.id) {
          const newQuantity = Number(action.payload.quantity);
          return {
            ...item,
            cartProducts: [
              {
                ...item.cartProducts[0],
                quantity: newQuantity,
              },
            ],
          };
        } else {
          return item;
        }
      });
    
      const newItemsCount = updatedCartItemsQuantity.reduce(
        (acc, item) => acc + Number(item.cartProducts[0].quantity),
        0
      );
    
      const newCartSubtotal = updatedCartItemsQuantity.reduce(
        (acc, item) => acc + item.cartProducts[0].quantity * item.cartProducts[0].price,
        0
      );
    
      return {
        ...state,
        cartItems: updatedCartItemsQuantity,
        itemsCount: newItemsCount,
        cartSubtotal: newCartSubtotal,
      };
      
    
    

    case actionTypes.EMPTY_CART:
      return {
        ...state,
        cartItems: action.payload,
        itemsCount: 0,
        cartSubtotal: 0,
      };
    default:
      return state;
  }
};
