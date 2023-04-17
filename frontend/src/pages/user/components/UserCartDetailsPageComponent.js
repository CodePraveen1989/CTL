import {
  Container,
  Row,
  Col,
  Form,
  Alert,
  ListGroup,
  InputGroup,
  Button,
  Modal,
} from "react-bootstrap";
import CartItemComponent from "../../../components/CartItemComponent";

import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import emailjs from '@emailjs/browser';

import { useDispatch } from 'react-redux';


const UserCartDetailsPageComponent = ({
  cartItems,
  itemsCount,
  cartSubtotal,
  userInfo,
  addToCart,
  removeFromCart,
  reduxDispatch,
  getUser,
  createOrder,
  getAllOrder,
  emptyCart
}) => {
  /* popup window */
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [userAddress, setUserAddress] = useState(false);
  const [missingAddress, setMissingAddress] = useState("");
  /* 这个支付方式，useState要用下面的下拉里面的一个，设置为默认，随后的语句可以修改 */
  const [paymentMethod, setPaymentMethod] = useState("Invoice");
  const [purchaseNumber, setPurchaseNumber] = useState("");

  const [largestInvoice, setLargestInvoice] = useState(0);


  /* const dispatch = useDispatch(); */




  const navigate = useNavigate();

  const changeCount = (productID, count) => {
    reduxDispatch(addToCart(productID, count));
  };

  const removeFromCartHandler = (productID, quantity, price) => {
    if (window.confirm("Are you sure?")) {
      reduxDispatch(removeFromCart(productID, quantity, price));
    }
    window.location.reload()
  };

  // 找出最大的invoice number，然后就可以+1了，开心
  useEffect(() => {
    getAllOrder()
      .then((orders) => {
        // Extract the invoiceNumber of each order
        const invoiceNumbers = orders.map((order) => order.invoiceNumber);
        // Find the largest invoiceNumber
        // console.log('我是里面的, INV数组',invoiceNumbers);

        const newInvoiceNumbers = invoiceNumbers.map((item) => {
          return item.slice(3);
        });
        // console.log('我是没有SLR的',newInvoiceNumbers);

        setLargestInvoice(Math.max(...newInvoiceNumbers));
      });
  }, []);

  // console.log('我是外面的,最大的',largestInvoice);

  useEffect(() => {
    /* 下方的一系列判定，若有一个不符合，则get your quote的按钮就不可用 */
    getUser()
      .then((data) => {
        if (
          !data.location ||
          !data.city ||
          !data.postCode ||
          !data.state ||
          !data.phone
        ) {
          setButtonDisabled(true);
          setMissingAddress(
            " In order to make order, fill out your profile with correct address, city etc."
          );
        } else {
          /* 这些是再下方的userAddress.location之类的信息，读取地址的。 */
          setUserAddress({
            location: data.location,
            city: data.city,
            postCode: data.postCode,
            state: data.state,
            phone: data.phone,
          });
          setMissingAddress(false);
        }
      })
      .catch((er) =>
        console.log(
          er.response.data.message ? er.response.data.message : er.response.data
        )
      );
  }, [userInfo._id]);


  const orderHandler = () => {

    const orderData = {
      orderTotal: {
        itemsCount: itemsCount,
        cartSubtotal: cartSubtotal,
      },
      cartItems: cartItems.map((item) => {
        return {
          productID: item.productID,
          name: item.name,
          image: { path: item.image ? item.image.path ?? null : null },
          cartProducts: [
            {
              attrs: item.cartProducts[0].attrs,
              barcode: item.cartProducts[0].barcode,
              count: item.cartProducts[0].count,
              ctlsku: item.cartProducts[0].ctlsku,
              price: item.cartProducts[0].price,
              quantity: item.cartProducts[0].quantity,
              sales: item.cartProducts[0].sales ?? null,
              slrsku: item.cartProducts[0].slrsku,
              suppliersku: item.cartProducts[0].suppliersku,
              _id: item.cartProducts[0]._id
            }
          ]
          /* quantity: item.quantity,
          price: item.price,
          count: item.count,
          ctlsku: item.ctlsku */
        };
      }),
      paymentMethod: paymentMethod,
      purchaseNumber: purchaseNumber,
      invoiceNumber: "SLR000" + (largestInvoice + 1),

    };

    createOrder(orderData)
      .then((data) => {
        if (data) {
          navigate("/user/order-details/" + data._id);
        }
      })
      .catch((err) => console.log(err));
    reduxDispatch(emptyCart())

  };

  /* 修改支付方式的vale */
  const choosePayment = (e) => {
    setPaymentMethod(e.target.value);
  };

  const enterPurchaseNum = (e) => {
    setPurchaseNumber(e.target.value);
  };

  const SERVICE_ID = "service_fwy9nsq";
  const TEMPLATE_ID = "template_9cl7aju";
  const USER_ID = "n2vM7onbbD8XNWgwK";

  const handleOnSubmit = (e) => {
    e.preventDefault();
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, USER_ID)
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
    e.target.reset()
  };

  return (
    <>
      <Container>
        <Row className="mt-4">
          <h1>CART DETAILS</h1>
          <Col md={8}>
            <br />
            <Row>
              <Col md={5}>
                <h3>SHIPPING</h3>
                <b>Name</b>: {userInfo.name} {userInfo.lastName} <br />
                <b>Site Location</b>: {userAddress.location} <br />
                <b>Phone</b>: {userAddress.phone} <br />
                <b>Address</b>: {userAddress.city} {userAddress.state}{" "}
                {userAddress.postCode}
              </Col>
              <Col md={5}>
                <h3>PAYMENT METHOD</h3>
                <Form.Select onChange={choosePayment} disabled>
                  <option value="Invoice">Invoice</option>
                  {/* <option value="Credit Cards">Credit Cards</option> */}
                  <option value="PayPal">PayPal</option>
                </Form.Select>
              </Col>
              <Row>
                <Col md={5}>
                  <Alert className="mt-3 lh-1 h-50 pt-2" variant="danger">
                    Not Delivered.
                    {missingAddress}
                  </Alert>
                </Col>&nbsp;&nbsp;&nbsp;
                <Col md={5}>
                  <Alert className="mt-3 lh-1 h-50 pt-2 pl-2" variant="danger">
                    Not Paid Yet
                  </Alert>
                </Col>
              </Row>
            </Row>
            <br />
            <h3>ORDER ITEMS</h3>
            <ListGroup variant="flush">
              {cartItems.map((item, idx) => (
                <CartItemComponent
                  item={item}
                  key={idx}
                  removeFromCartHandler={removeFromCartHandler}
                  changeCount={changeCount}
                />
              ))}
            </ListGroup>
          </Col>
          <Col SM={{ span: 4, offset: 1 }}>
            <ListGroup>
              <ListGroup.Item>
                <h4>Need Management Approval?</h4>
              </ListGroup.Item>
              <ListGroup.Item>
                Items Price (After Tax):{" "}
                <span className="fw-bold">${cartSubtotal.toLocaleString()}</span>
              </ListGroup.Item>

              <ListGroup.Item>
                <div className="d-grid gap-2">
                  <Button
                    size="sm"
                    variant="danger"
                    type="button"
                    onClick={handleShow}
                  >
                    Sending By Click
                  </Button>
                </div>
              </ListGroup.Item>
            </ListGroup>

            <ListGroup className="mt-5">
              <ListGroup.Item>
                <h3>ORDER SUMMARY</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                Shipping: <span className="fw-bold">Included</span>
              </ListGroup.Item>
              <ListGroup.Item>
                Tax: <span className="fw-bold">Included</span>
              </ListGroup.Item>
              <ListGroup.Item>
                Total Price:{" "}
                <span className="fw-bold text-danger">${cartSubtotal.toLocaleString()}</span>
              </ListGroup.Item>

              <ListGroup.Item controlId="validationSLRPurchaseNum">
                <Form.Label className="fw-bold text-danger">
                  SLR Purchase Number
                </Form.Label>
                <Form.Control
                  onChange={enterPurchaseNum}
                  type="string"
                  name="SLRPurchaseNumber"
                  placeholder="Please Enter Your Purchase Number"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please Enter Your Purchase Number.{" "}
                </Form.Control.Feedback>
                {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
              </ListGroup.Item>

              <ListGroup.Item>
                <div className="d-grid gap-2">
                  <Button
                    size="sm"
                    onClick={orderHandler}
                    variant="danger"
                    type="button"
                    disabled={buttonDisabled}
                  >
                    Comfirm Order
                  </Button>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>

      {/* 弹窗-sending approval */}
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Management Approval</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleOnSubmit} >
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Emaill Address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Email"
                aria-describedby="inputGroupPrepend"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please Enter an Email.{" "}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="formBasicPO"
            >
              <Form.Label>SLR Purchase Number</Form.Label>
              <Form.Control
                type="text"
                name="purchaseNumber"
                placeholder="PO Number"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please Enter PO.{" "}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="formBasicName"
            >
              <Form.Label>Your Name</Form.Label>
              <Form.Control
                type="text"
                name="user"
                placeholder="Full Name"
                required
              />
            </Form.Group>
            <Button type="submit" variant="outline-primary">
              Send
            </Button>
            <Button variant="secondary" onClick={handleClose} className="ms-3">
              Close
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UserCartDetailsPageComponent;

/* 
Welcome to our software beta test.

*/
