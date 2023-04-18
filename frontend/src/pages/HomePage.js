import ProductCarouselComponent from "../components/ProductCarouselComponent";
import ProductsPromotionComponent from "../components/ProductsPromotionComponent";
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
      <ProductsPromotionComponent />

      {/* ************   Carousel  ***************  */}
      <ProductCarouselComponent />


      {/* ************   Bottom Haxegon Categories  ***************  */}
      <div className="bg-light w-100">
        <Container>
          <div>
            <h1 className="o_p">
              OUR PRODUCTS
            </h1>
          </div>
        </Container>
        <Container >
          <Row xs={2} md={3} lg={4} xl={5} className="g-4">
            <Col>
              <LinkContainer style={onHover} to="/product-list?categoryName=PPE">
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
              <LinkContainer style={onHover} to="/product-list?categoryName=HAND-TOOLS">
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
              <LinkContainer style={onHover} to="/product-list?categoryName=ELECTRICAL">
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
              <LinkContainer style={onHover} to="/product-list?categoryName=SITE-SAFETY&subCategoryName=ACCESSORIES">
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
            <button className="allproducts bg-light">ALL PRODUCTS</button>
          </LinkContainer>
        </Container>
      </div>
    </>
  );
};

export default HomePage;
