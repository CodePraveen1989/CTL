import ProductCarouselComponent from "../components/ProductCarouselComponent";
import CountDownComponent from "../components/CountDownComponent";
import { LinkContainer } from "react-router-bootstrap";
import { Row, Container, Card, Col } from "react-bootstrap";


import "./general.css"

const HomePage = () => {
  const onHover = {
    cursor: "pointer",
  }

  return (
    <>
      {/* ************   daily deal top3  ***************  */}

{/*       <div className="bg-light top_div">

        <Container className="top3" fluid>
          <Row xs={1} md={3} lg={3} className="g-4 top3_cont">
            <Col className="top3_col">
              <Card style={onHover} className="top3_img">
                <LinkContainer to="/product-list">
                  <Card.Body className="c-body ">
                    <Card.Img crossOrigin="anonymous" className="soldout" variant="top" src={"/images/soldout.png"} />
                    <Card.Img crossOrigin="anonymous"  src={"/images/mining_equipment.jpg"} />
                  </Card.Body>
                </LinkContainer>
                <div className="top3_text">
                <h5 className="RRP">RRP $500,000</h5><h3 className="discounted_price">$200,000</h3>

                <div className="ctdtm">
                <CountDownComponent />
                </div></div>
                
              </Card>
            </Col>
            <Col className="top3_col">
            <Card style={onHover} className="top3_img">
                <LinkContainer to="/product-list">
                  <Card.Body className="c-body ">
                    <Card.Img crossOrigin="anonymous"  src={"/images/mining_equipment.jpg"} />
                  </Card.Body>
                </LinkContainer>
                <div className="top3_text">
                <h5 className="RRP">RRP $500,000</h5><h3 className="discounted_price">$200,000</h3>

                <div className="ctdtm">
                <CountDownComponent />
                </div></div>
                
              </Card>
            </Col>
            <Col className="top3_col">
            <Card style={onHover} className="top3_img">
                <LinkContainer to="/product-list">
                  <Card.Body className="c-body ">
                    <Card.Img crossOrigin="anonymous"  src={"/images/mining_equipment.jpg"} />
                  </Card.Body>
                </LinkContainer>
                <div className="top3_text">
                <h5 className="RRP">RRP $500,000</h5><h3 className="discounted_price">$200,000</h3>

                <div className="ctdtm">
                <CountDownComponent />
                </div></div>
                
              </Card>
            </Col>

          </Row>
        </Container>
      </div> */}

      {/* ************   Carousel  ***************  */}
      <ProductCarouselComponent />


      {/* ************   Bottom Haxegon Categories  ***************  */}
      <div className="bg-light w-100">
        <Container>
          <div>
            <h1 className="o_p">
              Our Products
            </h1>
          </div>
        </Container>
        <Container >
          <Row xs={2} md={3} lg={4} xl={5} className="g-4">
            <Col>
              <LinkContainer style={onHover}  to="/product-list/category/PPE">
                <div className='box'>
                  <div className="box1">
                    <div className="box2">
                      <div className="box3">
                        <img className='img_ppe' src='/images/products/ppe.png' alt="" />
                        <p className='hexagon_PPE'>PPE</p>
                      </div>
                    </div>
                  </div>
                </div>
              </LinkContainer>
            </Col>
            <Col>
              <LinkContainer style={onHover}  to="/product-list/category/HAND TOOLS">
                <div className='box'>
                  <div className="box1">
                    <div className="box2">
                      <div className="box3">
                        <img className='img_handtools' src='/images/products/handtools.png' alt="" />
                        <p className='hexagon_PowerTools'>HAND TOOLS</p>
                      </div>
                    </div>
                  </div>
                </div>
              </LinkContainer>
            </Col>
            <Col>
              <LinkContainer style={onHover}  to="/product-list/category/ELECTRICAL">
                <div className='box'>
                  <div className="box1">
                    <div className="box2">
                      <div className="box3">
                        <img className='img_electrical' src='/images/products/electrical.png' alt="" />
                        <p className='hexagon_electrical'>ELECTRICAL</p>
                      </div>
                    </div>
                  </div>
                </div>
              </LinkContainer>
            </Col>
            <Col>
              <LinkContainer style={onHover}  to="/product-list/category/ACCESSORIES">
                <div className='box'>
                  <div className="box1">
                    <div className="box2">
                      <div className="box3">
                        <img className='img_accessories' src='/images/products/accessories.png' alt="" />
                        <p className='hexagon_hydration'>ACCESSORIES</p>
                      </div>
                    </div>
                  </div>
                </div>
              </LinkContainer>
            </Col>
            <Col>
              <LinkContainer style={onHover} to="/product-list/category/PPE">
                <div className='box'>
                  <div className="box1">
                    <div className="box2">
                      <div className="box3">
                        <img className='img_mechanical_up' src='/images/products/gear.png' alt="" />
                        <img className='img_mechanical_down' src='/images/products/gear.png' alt="" />
                        <p className='hexagon_mechanical'>MECHANICAL</p>
                      </div>
                    </div>
                  </div>
                </div>
              </LinkContainer>
            </Col>
          </Row>
          <LinkContainer to="/product-list">
            <button className="allproducts bg-light">All Products</button>
          </LinkContainer>
        </Container>
      </div>
    </>
  );
};

export default HomePage;
