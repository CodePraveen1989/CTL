import {
  Row,
  Col,
  Container,
  ListGroup,
  Button,
  Tab,
  Tabs,
  Form,
  Image,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import AddedToCartMessageComponent from "../../components/AddedToCartMessageComponent";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "react-medium-image-zoom/dist/styles.css";
import FilterComponent from "../../components/filterQueryResultOptions/FilterComponent";
import BreadcrumbComponent from "../../components/filterQueryResultOptions/BreadcrumbComponent";

//react-image-lightbox -starts here
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
//react-image-lightbox -ends here


const ProductDetailsPageComponent = ({
  addToCartReduxAction,
  reduxDispatch,
  getProductDetails,
}) => {
  const { id } = useParams();
  const [showCartMessage, setShowCartMessage] = useState(false);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [qty, setQty] = useState(1);

  const [selectedProduct, setSelectedProduct] = useState("choose-product");
  const [selectedStock, setSelectedStock] = useState(null);

  //react-image-lightbox -starts here
  const [isOpen, setIsOpen] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  //react-image-lightbox -ends here

  function handleProductChange(event) {
    const attrs = event.target.value;
    setSelectedProduct(attrs);

    if (attrs !== "choose-product") {
      const stockItem = product.stock.find((item) => item.attrs === attrs);
      setSelectedStock(stockItem);
    } else {
      setSelectedStock(null);
    }
  }

  let stockCount = null;
  let stockPrice = null;
  let stockCode = null;

  if (selectedProduct !== "choose-product") {
    const matchingProduct = product.stock.find(
      (product) => product.attrs === selectedProduct
    );
    stockCount = matchingProduct && matchingProduct.count;
    stockPrice = matchingProduct && matchingProduct.price;
    stockCode = matchingProduct && matchingProduct.ctlsku;
  }

  console.log("selectedStock", selectedStock);

  console.log(product.stock, typeof product.stock);

  const addToCartHandler = () => {
    reduxDispatch(addToCartReduxAction(id, qty, selectedStock));
    setShowCartMessage(true);
  };

  let incNum = () => {
    if (qty > 0) {
      setQty(Number(qty) + 1);
    }
  };
  let decNum = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  useEffect(() => {
    getProductDetails(id)
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((er) =>
        setError(
          er.response.data.message ? er.response.data.message : er.response.data
        )
      );
  }, []);

  // 新的尺寸价格库存
  /*  const handleChangeAttr = (event) => {
    setSelectedAttrs(event.target.value); // Update the selected attribute when the user selects a different option
  }; */

  // 如果直接用toLocaleString() 报错的话，可能是value undefined了，那就format一下price， 然后再加上 toLocaleString
  const price = stockPrice;
  const formattedPrice = price ? price.toLocaleString() : "";

  // const products = useSelector((state) => state.cart.value);

  // for the zoomable picture Gallery
  // const images = [];
  // if (product && product.images) {
  //   product.images.forEach((image) => {
  //     images.push({
  //       original: image.path,
  //       thumbnail: image.path,
  //     });
  //   });
  // }



  //react-image-lightbox -starts here
  const images = [];
  if (product && product.images) {
    product.images.forEach((image) => {
      images.push({
        original: image.path,
        thumbnail: image.path,
        url: image.path,
        title: image.title,
        caption: image.name,
      });
    });
  }
  //react-image-lightbox -ends here

  return (
    <Container className="ms-3 " fluid>
      <BreadcrumbComponent />
      <Row>
        <Col xxl={2} xl={3} lg={3} md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <FilterComponent />
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col xxl={10} xl={9} lg={9} md={9}>
          <AddedToCartMessageComponent
            showCartMessage={showCartMessage}
            setShowCartMessage={setShowCartMessage}
          />
          <Row className="mt-5 ">
            {/* ************   Filter, has removed, now just take 1 space  ***************  */}
            <Col lg={1}>{/* <FilterComponent /> */}</Col>

            {/* ************   Product Pictures Display Carousel  ***************  */}
            <Col lg={3} className="m-4 ">

              <ImageGallery items={images} showFullscreenButton={false} showPlayButton={false} onClick={() => setIsOpen(true)} />
              {/* <button onClick={() => setIsOpen(true)}>Preview Images</button> */}
              {isOpen && <Lightbox
                imageTitle={images[imgIndex].title}
                imageCaption={images[imgIndex].caption}
                mainSrc={images[imgIndex].url}
                nextSrc={images[(imgIndex + 1) % images.length].url}
                prevSrc={images[(imgIndex + images.length - 1) % images.length].url}
                onCloseRequest={() => setIsOpen(false)}
                onMovePrevRequest={() => setImgIndex((imgIndex + images.length - 1) % images.length)}
                onMoveNextRequest={() => setImgIndex((imgIndex + 1) % images.length)}
              />}

            </Col>

            {/* ************   Product Details  ***************  */}
            <Col lg={5}>
              <Row>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h2 class="text-uppercase">{product.name}</h2>

                    <div>
                      <label htmlFor="attrs">Choose Product:&nbsp;&nbsp;&nbsp;  </label>
                      <select
                        id="product-select"
                        value={selectedProduct}
                        onChange={handleProductChange}
                      >
                        <option value="choose-product"><b>Choose Product</b></option>
                        {product.stock &&
                          product.stock.map((stock) => (
                            <option key={stock.attrs} value={stock.attrs}>
                              {stock.attrs}
                            </option>
                          ))}
                      </select>
                      {stockCount !== null && (
                        <p>
                          Status:{" "}
                          {stockCount > 19 ? (
                            <i className="bi bi-circle-fill fw-bold text-success">
                              {" "}
                              in stock
                            </i>
                          ) : (
                            <i className="bi bi-circle-fill fw-bold text-warning">
                              {" "}
                              low stock
                            </i>
                          )}
                        </p>
                      )}
                    </div><br />
                    <Row hidden={selectedProduct === "choose-product"}>
                      <Col>
                        <h6>PRODUCT CODE : {stockCode}</h6>
                        <h6>
                          Price: <span className="fw-bold">${formattedPrice}</span>
                        </h6>
                        <br />
                      </Col>
                    </Row>
                    <h6>Quantity :</h6>

                    <Row >
                      <Col lg={3}>
                        <div className="btn-group" role="group">
                          <button type="button" className="btn_jj" onClick={decNum}>
                            {" "}
                            -{" "}
                          </button>
                          <Form.Control
                            type="number"
                            min={1}
                            className="form-control col-0"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          />
                          <button type="button" className="btn_jj" onClick={incNum}>
                            {" "}
                            +{" "}
                          </button>
                        </div>
                      </Col>
                      &nbsp;&nbsp;

                      <Col lg={4}>
                        <Button
                          onClick={() => addToCartHandler(selectedStock)}
                          className="btn_blue btn-ripple"
                          variant="success"
                          disabled={selectedProduct === "choose-product"}
                        >
                          Add to cart
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Row>

              {/* ************   Product details with download pdf  ***************  */}
              <Row>
                <Col className="mt-5">
                  <Container className="border border-light border-5">
                    <Tabs
                      defaultActiveKey="Description"
                      transition={false}
                      id="noanim-tab-example"
                      className="mb-3"
                    >
                      <Tab
                        className="m-3"
                        eventKey="Description"
                        title="Specifications"
                      >
                        {product.description}
                      </Tab>
                      {/* 看一下，如果pdfs 路径里面 没有值，就显示null，有的话，就map 一下 */}
                      {product.pdfs && product.pdfs.length > 0 ? (
                        <Tab eventKey="Download" title="Download">
                          {product.pdfs &&
                            product.pdfs.map((pdf, idx) => (
                              <div
                                className="border border-light border-2 m-3 p-3"
                                key={idx}
                              >
                                <Link
                                  to={pdf.path ?? null}
                                  target="_blank"
                                  download
                                >
                                  {pdf.path.slice(18)}
                                </Link>
                              </div>
                            ))}
                        </Tab>
                      ) : null}
                    </Tabs>
                  </Container>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>

    </Container>
  );
};


export default ProductDetailsPageComponent;
