import UserCartDetailsPageComponent from "./components/UserCartDetailsPageComponent";

import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart, emptyCart } from "../../redux/actions/cartActions";

import axios from "axios";

const UserCartDetailsPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const itemsCount = useSelector((state) => state.cart.itemsCount);
  const cartSubtotal = useSelector((state) => state.cart.cartSubtotal);
  const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);

  console.log('Page里的', cartItems); 

  const reduxDispatch = useDispatch();

  const getUser = async () => {
    const { data } = await axios.get("/api/users/profile/" + userInfo._id);
    return data;
  };

  const createOrder = async (orderData) => {
      const { data } = await axios.post("/api/orders", { ...orderData });
      return data;
  }

  const getAllOrder = async () => {
    const { data } = await axios.get("/api/orders");
    return data;
  };

  

  return (
    <UserCartDetailsPageComponent
      cartItems={cartItems}
      itemsCount={itemsCount}
      cartSubtotal={cartSubtotal}
      userInfo={userInfo}
      addToCart={addToCart}
      removeFromCart={removeFromCart}
      reduxDispatch={reduxDispatch}
      getUser={getUser}
      createOrder={createOrder}
      getAllOrder={getAllOrder}
      emptyCart={emptyCart}
    />
  );
};

export default UserCartDetailsPage;

