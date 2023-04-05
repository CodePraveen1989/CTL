import { Carousel, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import "./page.css";


const ProductCarouselComponent = () => {


  return (
    <Carousel className="mt-2 ms-1 carousel">
      <Carousel.Item>
        <img
          className="d-block w-100 c_img"
          src="images/carousel/SWARTSTOOLS.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
{/*           <aside>
            <h5 className="brand_title">Explore our brand</h5>
            <h1 className="brand_title">Paramount</h1>
            <p className="brand_detail">
              Nulla vitae elit libero, a pharetra augue mollis interdum.
            </p>
            <LinkContainer to="/product-list">
              <Button className="CTL_btn" variant="primary">Explore our brand</Button>
            </LinkContainer>
          </aside> */}
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/carousel/BRAYDY.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
{/*           <aside>
            <h5 className="brand_title">Explore our brand</h5>
            <h1 className="brand_title">BISON</h1>
            <p className="brand_detail">
              Nulla vitae elit libero, a pharetra augue mollis interdum.
            </p>
            <LinkContainer to="/product-list">
              <Button className="CTL_btn ">Explore our brand</Button>
            </LinkContainer>
          </aside> */}
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/carousel/ParamountSunBlock.jpg"
          alt="Second slide"
        />
        <Carousel.Caption>
{/*           <aside>
            <h5 className="brand_title">Explore our brand</h5>
            <h2 className="brand_title">PRO</h2>
            <p className="brand_detail">
              Nulla vitae elit libero, a pharetra augue mollis interdum.
            </p>
            <LinkContainer to="/product-list">
              <Button className="CTL_btn" variant="primary">Explore our brand</Button>
            </LinkContainer>
          </aside> */}
        </Carousel.Caption>
      </Carousel.Item>

    </Carousel>
  );
};

export default ProductCarouselComponent;
