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

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { useReactToPrint } from "react-to-print";
import DeliveryNotePrint from "../../../components/DeliveryNotePrint";
import InvoicePrint from "../../../components/InvoicePrint";
import { PDFDownloadLink } from "@react-pdf/renderer";

// 如果要改markAsPaid的功能，不但需要在这里改，还需要去orderDetailsPage里添加paid的api和功能，因为在backend的order route和controller里面已经写过updateToPaid了，所以可以直接用。
const OrderDetailsPageComponent = ({
  getOrder,
  getUser,
  markAsDelivered,
  markAsPaid,
}) => {
  const { id } = useParams();

  const [userInfo, setUserInfo] = useState({});
  const [userAddress, setUserAddress] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("");
  const [purchaseNumber, setPurchaseNumber] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  const [isDelivered, setIsDelivered] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [cartSubtotal, setCartSubtotal] = useState(0);
  const [deliveredButtonDisabled, setdeliveredButtonDisabled] = useState(false);
  const [paidButtonDisabled, setpaidButtonDisabled] = useState(false);
  const [orderDeliveredButton, setorderDeliveredButton] =
    useState("Mark as delivered");
  const [orderPaidButton, setorderPaidButton] = useState("Mark as Paid");
  const [cartItems, setCartItems] = useState([]);

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
      .then((order) => {
        setUserInfo(order.user);
        setPaymentMethod(order.paymentMethod);
        setInvoiceNumber(order.invoiceNumber);
        setCreatedAt(order.createdAt);
        setPurchaseNumber(order.purchaseNumber);
        order.isPaid ? setIsPaid(order.paidAt) : setIsPaid(false);
        order.isDelivered
          ? setIsDelivered(order.deliveredAt)
          : setIsDelivered(false);
        setCartSubtotal(order.orderTotal.cartSubtotal);
        if (order.isDelivered) {
          setorderDeliveredButton("Order is Delivered");
          setdeliveredButtonDisabled(true);
        }
        if (order.isPaid) {
          setorderPaidButton("Order is Paid");
          setpaidButtonDisabled(true);
        }
        setCartItems(order.cartItems);
      })
      .catch((er) =>
        console.log(
          er.response.data.message ? er.response.data.message : er.response.data
        )
      );
  }, [isDelivered, isPaid, id]);
  return (
    <Container>
      <Row className="mt-4">
        <h1>ORDER DETAILS</h1>
        <Col md={8}>
          <br />
          <Row>
            <Col md={6}>
              <h3>SHIPPING</h3>
              <b>Name</b>: {userInfo.name} {userInfo.lastName} <br />
              <b>Address</b>: {userInfo.address} {userInfo.city}{" "}
              {userInfo.state} {userInfo.zipCode} <br />
              <b>Phone</b>: {userInfo.phoneNumber}
            </Col>
            <Col md={6}>
              <h3>PAYMENT METHOD</h3>
              <Form.Select value={paymentMethod} disabled={true}>
                <option value="Invoice">Invoice</option>
                <option value="PayPal">PayPal</option>
              </Form.Select>
            </Col>
            <Row>
              <Col>
                <Alert
                  className="mt-3"
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
                <Alert className="mt-3" variant={isPaid ? "success" : "danger"}>
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
              <CartItemComponent key={idx} item={item} orderCreated={true} />
            ))}
          </ListGroup>
        </Col>
        <Col md={3}>
          <ListGroup>
            <ListGroup.Item>
              <h3>ORDER SUMMARY</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              Items price (after tax):{" "}
              <span className="fw-bold">${cartSubtotal}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              Shipping: <span className="fw-bold">Included</span>
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
              Purchase Order:
              <span className="fw-bold ms-1">{purchaseNumber}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="d-grid gap-2">
                <Button
                  size="lg"
                  onClick={() =>
                    markAsDelivered(id)
                      .then((res) => {
                        if (res) {
                          setIsDelivered(true);
                        }
                      })
                      .catch((er) =>
                        console.log(
                          er.response.data.message
                            ? er.response.data.message
                            : er.response.data
                        )
                      )
                  }
                  disabled={deliveredButtonDisabled}
                  variant="success"
                  type="button"
                >
                  {orderDeliveredButton}
                </Button>
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="d-grid gap-2">
                <Button
                  size="lg"
                  onClick={() =>
                    markAsPaid(id)
                      .then((res) => {
                        if (res) {
                          setIsPaid(true);
                        }
                      })
                      .catch((er) =>
                        console.log(
                          er.response.data.message
                            ? er.response.data.message
                            : er.response.data
                        )
                      )
                  }
                  disabled={paidButtonDisabled}
                  variant="success"
                  type="button"
                >
                  {orderPaidButton}
                </Button>
              </div>
            </ListGroup.Item>

            <ListGroup.Item>
              <div className="d-grid gap-2">
                <PDFDownloadLink
                  document={
                    <DeliveryNotePrint
                      cartItems={cartItems}
                      invoiceNumber={invoiceNumber}
                      userInfo={userInfo}
                      userAddress={userAddress}
                      purchaseNumber={purchaseNumber}
                      cartSubtotal={cartSubtotal}
                      invoiceDate={createdAt}
                    />
                  }
                  fileName={"PS-" + invoiceNumber}
                >
                  {({ loading }) =>
                    loading ? (
                      <Button size="lg">Loading Delivery Note...</Button>
                    ) : (
                      <Button size="lg">Download Delivery Note</Button>
                    )
                  }
                </PDFDownloadLink>
              </div>
            </ListGroup.Item>

            <ListGroup.Item>
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
                      <Button size="lg">Loading Invoice...</Button>
                    ) : (
                      <Button size="lg">
                        &nbsp; &nbsp; Download Invoice
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </Button>
                    )
                  }
                </PDFDownloadLink>
              </div>
            </ListGroup.Item>
          </ListGroup>
          <label><u><a href="/admin/orders">Go to All Orders </a></u></label>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderDetailsPageComponent;
