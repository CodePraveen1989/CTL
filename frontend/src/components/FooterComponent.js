import { Container, Row, Col } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import { useLocation } from 'react-router-dom';


import "./page.css";

const FooterComponent = () => {

  const location = useLocation();


  return (
    /*index.cssfooter。 position：ab; bottom：0 etc. */
    <footer className={location.pathname === "/login" ? 'loginHide' : ''}>
      <Container className="footer" fluid>
        <Row className="mt-5 nav_bgc">
          <Col className="text-white py-5 frist-col">
            <h6>Services</h6>
            <Nav.Link className="nav_c" href="/callbackservice">Callback Service</Nav.Link>

          </Col>
          <Col className="text-white py-5">
            <h6>Help Center</h6>
            {/* //todo: uncomment this page later when go live for public */}
            {/* <Nav.Link className="nav_c" href="/FaqPage">Help/ FAQ</Nav.Link> */}
            <Nav.Link className="nav_c" href="/TermsConditions">Terms & Conditions</Nav.Link>
            <Nav.Link className="nav_c" href="/privacypolicy">Privacy Policy</Nav.Link>
          </Col>
          <Col className="text-white py-5">
            <h6>Contact Us</h6>
            <Nav.Link className="nav_c" href="mailto:sales@ctlservices.com.au">sales@ctlservices.com.au</Nav.Link>
            <Nav.Link className="nav_c" href="mailto:accounts@ctlservices.com.au">accounts@ctlservices.com.au</Nav.Link>
          </Col>
        </Row>
        <Row className="ft_bgc text-center">
          <Col className="text-white py-1">
            Copyright &copy; CTL Australia
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default FooterComponent;
