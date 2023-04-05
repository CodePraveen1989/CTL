import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { cartReducer } from "./reducers/cartReducers";
import { userRegisterLoginReducer } from "./reducers/userReducers";
import { getCategoriesReducer } from "./reducers/categoryReducers";


const reducer = combineReducers({
  cart: cartReducer,
  userRegisterLogin: userRegisterLoginReducer,
  getCategories: getCategoriesReducer, 
});

const cartItemsInLocalStorage = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];
console.log('cartItemsInLocalStorage',cartItemsInLocalStorage);

const userInfoInLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : sessionStorage.getItem("userInfo")
  ? JSON.parse(sessionStorage.getItem("userInfo"))
  : {};

  const INITIAL_STATE = {
    cart: {
      cartItems: cartItemsInLocalStorage,
      itemsCount: cartItemsInLocalStorage
      ? cartItemsInLocalStorage.reduce(
          (totalQuantity, cartItem) => {
            const productQuantity = cartItem.cartProducts.reduce(
              (quantity, product) => quantity + Number(product.quantity),
              0
            );
            return totalQuantity + productQuantity;
          },
          0
        )
      : 0,
    
      cartSubtotal: cartItemsInLocalStorage
        ? cartItemsInLocalStorage.reduce(
            (totalPrice, cartItem) => {
              const productPrice = cartItem.cartProducts.reduce(
                (price, product) => price + product.price * product.quantity,
                0
              );
              return totalPrice + productPrice;
            },
            0
          )
        : 0,
    },
    userRegisterLogin: { userInfo: userInfoInLocalStorage },
  };
  
  
console.log('cartItemsInLocalStorage',cartItemsInLocalStorage);
console.log('INITIAL_STATE',INITIAL_STATE);

const middleware = [thunk];
const store = createStore(
  reducer,
  INITIAL_STATE,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
