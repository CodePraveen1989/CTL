import {
  Container,
  Row,
  Col,
  Form,
  Alert,
  ListGroup,
  Button,
} from "react-bootstrap";
import CartItemComponent from "../../../components/CartItemComponent";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "./invoicePDF.css";

// import { useReactToPrint } from "react-to-print";
import InvoicePrint from "../../../components/InvoicePrint";
import { PDFDownloadLink } from "@react-pdf/renderer";

const UserOrderDetailsPageComponent = ({
  userInfo,
  getUser,
  getOrder,
  loadPayPalScript,
}) => {
  const [userAddress, setUserAddress] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("");
  const [purchaseNumber, setPurchaseNumber] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [orderButtonMessage, setOrderButtonMessage] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [cartSubtotal, setCartSubtotal] = useState(0);
  const [isDelivered, setIsDelivered] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [createdAt, setCreatedAt] = useState("");

  const paypalContainer = useRef();

  const { id } = useParams();

  useEffect(() => {
    getUser()
      .then((data) => {
        setUserAddress({
          location: data.location,
          city: data.city,
          postCode: data.postCode,
          state: data.state,
          phone: data.phone,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getOrder(id)
      .then((data) => {
        setPaymentMethod(data.paymentMethod);
        setInvoiceNumber(data.invoiceNumber);
        setCreatedAt(data.createdAt);

        setPurchaseNumber(data.purchaseNumber);
        setCartItems(data.cartItems);
        console.log("praveen", data.cartItems);
        setCartSubtotal(data.orderTotal.cartSubtotal);
        data.isDelivered
          ? setIsDelivered(data.deliveredAt)
          : setIsDelivered(false);
        data.isPaid ? setIsPaid(data.paidAt) : setIsPaid(false);
        if (data.isPaid) {
          setOrderButtonMessage("Your order has been completed!");
          setButtonDisabled(true);
        } else {
          if (data.paymentMethod === "Invoice") {
            setOrderButtonMessage("Thanks for your order");
          } else if (data.paymentMethod === "PayPal") {
            /* setButtonDisabled(true); */
            setOrderButtonMessage(
              "To pay for your order click one of the buttons below"
            );
          }
        }
      })

      .catch((err) => console.log(err));
  }, []);
  console.log("OrderDetailPage cartItems", cartItems, typeof cartItems);

  // a function, split array in to chunks
  function splitArrayIntoChunks(arr, chunkSize) {
    const result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }
    return result;
  }

  // slice the first 10 into first array, rest in chunks
  function splitCartItems(cartItems) {
    const firstChunk = cartItems.slice(0, 10);
    const remainingItems = cartItems.slice(10);
    const chunks = splitArrayIntoChunks(remainingItems, 15);
    return [firstChunk, ...chunks];
  }

  // const first array and rest chunks
  const [firstNineItems, ...otherChunks] = splitCartItems(cartItems);

  // use otherChunks[] to pick array from chunks.
  /* here is your code to use chunks[] */
  console.log("OrderDetailPage chunks", firstNineItems, otherChunks);

  if (otherChunks[2]) {
    console.log("我是chunks2", otherChunks[2]);
  }

  // 分隔一下，跟上面的
  const orderHandler = () => {
    setButtonDisabled(true);
    if (paymentMethod === "PayPal") {
      setOrderButtonMessage(
        "To pay for your order click one of the buttons below"
      );
      if (!isPaid) {
        // to do: load PayPal script and do actions
        loadPayPalScript(cartSubtotal, cartItems, id, updateStateAfterOrder);
      }
    } else {
      setOrderButtonMessage("Your order was placed. Thank you");
    }
  };

  /* paypal的一些判定 */
  const updateStateAfterOrder = (paidAt) => {
    setOrderButtonMessage("Thank you for your payment!");
    setIsPaid(paidAt);
    setButtonDisabled(true);
    paypalContainer.current.style = "display: none";
  };

  return (
    <Container>
      <Row className="mt-4">
        <h1>ORDER DETAILS</h1>
        <Col md={9}>
          <br />
          <Row>
            <Col md={6}>
              <h3>SHIPPING</h3>
              <b>Name</b>: {userInfo.name} {userInfo.lastName} <br />
              <b>Site Location</b>: {userAddress.location} <br />
              <b>Phone</b>: {userAddress.phone} <br />
              <b>Address</b>: {userAddress.city} {userAddress.state}{" "}
              {userAddress.postCode}
            </Col>
            <Col md={6}>
              <h3>PAYMENT DETAILS</h3>
              <Form.Select value={paymentMethod} disabled={true}>
                <option value="Invoice">Invoice</option>
                {/* <option value="Credit Cards">Credit Cards</option> */}
                <option value="PayPal">PayPal</option>
              </Form.Select>
            </Col>
            <Row>
              <Col>
                <Alert
                  className="mt-3 lh-1 h-50 pt-2"
                  variant={isDelivered ? "success" : "danger"}
                >
                  {isDelivered ? (
                    <>
                      Delivered at{" "}
                      {new Date(isDelivered).toLocaleString("en-AU", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      })}
                    </>
                  ) : (
                    <>Not delivered</>
                  )}
                </Alert>
              </Col>
              <Col>
                <Alert
                  className="mt-3 lh-1 h-50 pt-2"
                  variant={isPaid ? "success" : "danger"}
                >
                  {isPaid ? <>Paid on {new Date(isPaid).toLocaleString("en-AU", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}</> : <>Not paid yet</>}
                </Alert>
              </Col>
            </Row>
          </Row>
          <br />
          <h3>ORDER ITEMS</h3>
          <ListGroup variant="flush">
            {cartItems.map((item, idx) => (
              <CartItemComponent item={item} key={idx} orderCreated={true} />
            ))}
          </ListGroup>
        </Col>
        <Col md={3}>

          <ListGroup>
            <ListGroup.Item>
              <h3>ORDER SUMMARY</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              Item Price (after tax) :{" "}
              <span className="fw-bold">{" "}$ {cartSubtotal.toLocaleString()}
              </span>
            </ListGroup.Item>
            <ListGroup.Item>
              Items: <span className="fw-bold">{cartItems.length}</span> products
            </ListGroup.Item>
            <ListGroup.Item>
              Tax: <span className="fw-bold">Included</span>
            </ListGroup.Item>
            <ListGroup.Item >
              Total Price :&nbsp;

              {isDelivered && isPaid ?
                <span className="fw-bold text-success">${cartSubtotal.toLocaleString()}</span>
                :
                isPaid ?
                  <span className="fw-bold text-warning">${cartSubtotal.toLocaleString()}</span>
                  :
                  <span className="fw-bold text-danger">${cartSubtotal.toLocaleString()}</span>

              }
            </ListGroup.Item>
            <ListGroup.Item>
              Purchase Order:{" "}
              <span className="fw-bold">{purchaseNumber}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <br />
              <div className="d-grid gap-2">
                <PDFDownloadLink
                  document={
                    <InvoicePrint
                      cartItems={cartItems}
                      invoiceNumber={invoiceNumber}
                      userInfo={userInfo}
                      userAddress={userAddress}
                      purchaseNumber={purchaseNumber}
                      cartSubtotal={cartSubtotal}
                      invoiceDate={createdAt}
                    />
                  }
                  fileName={"INV-" + invoiceNumber}
                >
                  {({ loading }) =>
                    loading ? (
                      <Button>Loading Invoice...</Button>
                    ) : (
                      <Button>Download Invoice</Button>
                    )
                  }
                </PDFDownloadLink>
              </div>
              <br />
              <div style={{ position: "relative", zIndex: 1 }}>
                <div ref={paypalContainer} id="paypal-container-element"></div>
              </div>
            </ListGroup.Item>
          </ListGroup>
          <label><u><a href="/user/my-orders">Go to My Orders </a></u></label>
        </Col>

      </Row>
    </Container>
  );
};

export default UserOrderDetailsPageComponent;
