import { Row, Col, ListGroup, Form } from "react-bootstrap";
import RemoveFromCartComponent from "./RemoveFromCartComponent";

import React from "react";

const CartItemComponent = ({
  item,
  removeFromCartHandler = false,
  orderCreated = false,
  changeCount = false,
}) => {

  console.log('cartItemComponent', item);

  return (
    <>
      <ListGroup.Item>
        <Row>
          <Col md={2}>
            <div className="">
              {/* Image */}
              <img
                crossOrigin="anonymous"
                src={item.image ? item.image.path ?? null : null}

                className="w-100 img_hovf"
                alt="s"
              />
              {/* Image */}
            </div>
          </Col>
          <Col md={4}>
            <a href={`/product-details/${item.productID}`}>
              <p>
                <strong class="text-uppercase">{item.name}</strong>
              </p>
            </a>
          </Col>
          <Col md={3}>
            <p><span className="font-weight-bold">{item.cartProducts[0].attrs}</span></p>
            <p><span className="font-weight-bold">Unit Price: $</span>{item.cartProducts[0].price}</p>
            {/*  */}
          </Col>
          <Col md={2}>
            <Form.Control
              type="number"
              min={1}
              className="form-control"
              value={item.cartProducts[0].quantity}
              onChange={changeCount ? (e) => changeCount(item.cartProducts[0]._id, e.target.value) : undefined} disabled={orderCreated}
            />
          </Col>
          {/* delete button trash */}
          <Col md={1}>
            <RemoveFromCartComponent
              orderCreated={orderCreated}
              productID={item.cartProducts[0]._id}
              quantity={item.quantity}
              price={item.price}
              removeFromCartHandler={removeFromCartHandler ? removeFromCartHandler : undefined}
            />
          </Col>
        </Row>
      </ListGroup.Item>
      <br />
    </>
  );
};

export default CartItemComponent;
