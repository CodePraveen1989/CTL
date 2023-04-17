import { Container, Row, Col } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import { useLocation } from 'react-router-dom';


import "./page.css";

const FooterComponent = () => {

  const location = useLocation();


  return (
    /*index.cssfooter。 position：ab; bottom：0 etc. */
    <footer className={location.pathname === "/login" ? 'loginHide' : ''}>
      <Container className="foot" fluid>
        <Row className="ft_bgc">
          <Col className="first-col">
            <h6>SERVICES</h6>
            <Nav.Link className="ft_c" href="/callbackservice">Callback Service</Nav.Link>

          </Col>
          <Col className="first-col">
            <h6>HELP CENTER</h6>
            {/* //todo: uncomment this page later when go live for public */}
            {/* <Nav.Link className="nav_c" href="/FaqPage">Help/ FAQ</Nav.Link> */}
            <Nav.Link className="ft_c" href="/TermsConditions">Terms & Conditions</Nav.Link>
            <Nav.Link className="ft_c" href="/privacypolicy">Privacy Policy</Nav.Link>
          </Col>
          <Col className="first-col">
            <h6>CONTACT US</h6>
            <Nav.Link className="ft_c" href="mailto:sales@ctlservices.com.au">sales@ctlservices.com.au</Nav.Link>
            <Nav.Link className="ft_c" href="mailto:accounts@ctlservices.com.au">accounts@ctlservices.com.au</Nav.Link>
          </Col>
        </Row>
        <Row className="ft_bgc text-center">

          <Col className="pt-5 pb-3 text-white">
            Copyright &copy; CTL Australia
          </Col>

        </Row>
      </Container>
    </footer>
  );
};

export default FooterComponent;
