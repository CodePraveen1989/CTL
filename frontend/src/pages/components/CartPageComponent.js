import { Container, Row, Col, Alert, ListGroup, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import CartItemComponent from "../../components/CartItemComponent";

const CartPageComponent = ({
  editQuantity,
  removeFromCart,
  cartItems,
  cartSubtotal,
  reduxDispatch,
}) => {
  const changeCount = (id, qty) => {
    reduxDispatch(editQuantity(id, qty));
  };

  const removeFromCartHandler = (id, qty, price) => {
    if (window.confirm("Are you sure?")) {
      reduxDispatch(removeFromCart(id, qty, price));
    }
    window.location.reload()
  }

  console.log('cartItems', cartItems);


  return (
    <Container>
      <Row className="mt-5">
        <Col md={8}>
          <h1>SHOPPING CART</h1><br />
          {cartItems.length === 0 ? (
            <Alert variant="info">Your Cart Is Empty</Alert>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item, idx) => (
                <CartItemComponent
                  item={item}
                  key={idx}
                  changeCount={changeCount}
                  removeFromCartHandler={removeFromCartHandler}
                />
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <ListGroup>
            <ListGroup.Item>
              <h3>Subtotal ({cartItems.length} {cartItems.length === 1 ? "Product" : "Products"})</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              Price: <span className="fw-bold">$ {cartSubtotal.toLocaleString()}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <LinkContainer to="/user/cart-details">
                <Button disabled={cartSubtotal === 0} type="button" variant="success">Proceed To Checkout</Button>
              </LinkContainer>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default CartPageComponent;
