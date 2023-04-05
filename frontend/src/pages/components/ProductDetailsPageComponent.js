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

import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import "react-medium-image-zoom/dist/styles.css";
// import FilterComponent from "../components/filterQueryResultOptions/FilterComponent";

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

  return (
    <Container>
      <AddedToCartMessageComponent
        showCartMessage={showCartMessage}
        setShowCartMessage={setShowCartMessage}
      />
      <Row className="mt-5">
        {/* ************   Filter, has removed, now just take 1 space  ***************  */}
        <Col lg={1}>{/* <FilterComponent /> */}</Col>

        {/* ************   Product Pictures Display Carousel  ***************  */}
        <Col lg={4} className="m-4">
          <Carousel>
            {product.images &&
              product.images.map((image, idx) => (
                <div key={idx} style={{ position: "relative" }}>
                  <Image
                    crossOrigin="anonymous"
                    src={image.path ?? null}
                    fluid
                  />
                </div>
              ))}
          </Carousel>
        </Col>

        {/* ************   Product Details  ***************  */}
        <Col lg={5}>
          <Row>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>{product.name}</h2>

                <h5>PRODUCT CODE: {stockCode}</h5>

                <h6>
                  Price: <span className="fw-bold">${formattedPrice}</span>
                </h6>
                <div>
                  <label htmlFor="attrs">Choose Product:</label>
                  <select
                    id="product-select"
                    value={selectedProduct}
                    onChange={handleProductChange}
                  >
                    <option value="choose-product">Choose Product</option>
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
                </div>

                {/* <h6>
                  Status:{" "}
                  {product.count > 0 ? (
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
                </h6> */}

                <h6>Quantity:</h6>

                <Row>
                  <Col lg={4}>
                    <div className="btn-group" role="group">
                      <button type="button" className="btn_jj" onClick={decNum}>
                        {" "}
                        -{" "}
                      </button>
                      <Form.Control
                        type="number"
                        min={1}
                        className="form-control"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      />
                      <button type="button" className="btn_jj" onClick={incNum}>
                        {" "}
                        +{" "}
                      </button>
                    </div>
                  </Col>
                  <Col lg={4}>
                    <Button
                      onClick={() => addToCartHandler(selectedStock)}
                      className="btn_blue btn-ripple"
                      variant="danger"
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
                    title="Description"
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
    </Container>
  );
};


export default ProductDetailsPageComponent;
