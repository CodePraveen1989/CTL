import * as actionTypes from "../constants/cartConstants";
import axios from "axios";

export const addToCart =
  (productId, qty, selectedStock) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/get-one/${productId}`);
    dispatch({
      type: actionTypes.ADD_TO_CART,
      payload: {
        productID: data._id,
        name: data.name,
        /* price: data.price, */
        image: data.images[0] ?? null,
        cartProducts: [{...selectedStock, quantity: qty}],
        ctlsku: data.ctlsku
      },
    });
    localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
    console.log('addToCart-data',data);
  };

  // V1
  export const removeFromCart = (id, qty, price) => (dispatch, getState) => {
    dispatch({
      type: actionTypes.REMOVE_FROM_CART,
      payload: { id: id, quantity: qty, price: price },
    });
    localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
  };
  


  export const editQuantity = (id, qty) => (dispatch, getState) => {
    dispatch({
      type: actionTypes.EDIT_QUANTITY,
      payload: { id: id, quantity: qty },
    });
    localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
  };
  
  

// 追踪之后可以看到，add to cart 的信息，不单单存入了 redux，还有localStorage，然后清空cart就行
export const emptyCart = () => {
  localStorage.clear("cart")
  return {
    type: actionTypes.EMPTY_CART,
    payload: []
  };  
};

