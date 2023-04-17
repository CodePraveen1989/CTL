import { Alert, Button } from "react-bootstrap";
import "./AddedToCartMessageComponent.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const AddedToCartMessageComponent = ({
  showCartMessage,
  setShowCartMessage,
}) => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (showCartMessage) {
      setShow(true);
      setTimeout(() => {
        setShow(false);
        setShowCartMessage(false);
      }, 1200);
    } else {
      setShow(false);
    }
  }, [showCartMessage]);

  return (
    <div className="added-to-cart-message-container">
      <Alert
        show={show}
        variant="success"
        onClose={() => setShow(false)}
        dismissible
        className={`added-to-cart-message ${show ? "show" : ""}`}
      >
        <Alert.Heading>This product is added to your cart!</Alert.Heading>
        {/* <p>
          <Button variant="success" onClick={goBack}>
            Go back
          </Button>{" "}
          <Link to="/cart">
            <Button variant="danger">Go to cart</Button>
          </Link>
        </p> */}
      </Alert>
    </div>
  );
};

export default AddedToCartMessageComponent;
