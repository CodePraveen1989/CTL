import {
  Row,
  Col,
  Container,
  Form,
  Button,
  CloseButton,
  Table,
  Alert,
  Image,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import React, { useState, useEffect, Fragment, useRef } from "react";
import { useParams } from "react-router-dom";
//当更改了产品信息，就navigate去product list page
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const onHover = {
  cursor: "pointer",
  position: "absolute",
  left: "5px",
  top: "-10px",
  transform: "scale(2.7)",
};

//需要的变量，以及随后会用到的功能
const AdminEditProductPage = ({
  categories,
  fetchProduct,
  updateProductApiRequest,
  reduxDispatch,
  saveAttributeToCatDoc,
  imageDeleteHandler,
  uploadHandler,
  uploadImagesApiRequest,
  uploadImagesCloudinaryApiRequest,
  uploadPdfApiRequest,
  uploadPdfCloudinaryApiRequest,
  pdfDeleteHandler,
}) => {
  const [validated, setValidated] = useState(false);
  const [product, setProduct] = useState({});
  const [updateProductResponseState, setUpdateProductResponseState] = useState({
    message: "",
    error: "",
  });

  const [attributesFromDb, setAttributesFromDb] = useState([]); // for select lists
  const [attributesTable, setAttributesTable] = useState([]); // for html table
  const [categoryChoosen, setCategoryChoosen] = useState("Choose category"); // 输入categories
  const [newAttrKey, setNewAttrKey] = useState(false); // 输入attri新值
  const [newAttrValue, setNewAttrValue] = useState(false);
  const [imageRemoved, setImageRemoved] = useState(false); //联动之后，remove iamge了会refreshing page
  const [pdfRemoved, setPdfRemoved] = useState(false); //联动之后，remove iamge了会refreshing page
  const [isUploading, setIsUploading] = useState(""); // showing the message and the real time done
  const [imageUploaded, setImageUploaded] = useState(false); // use to changing the state and refreshing the page
  const [pdfUploaded, setPdfUploaded] = useState(false); // use to changing the state and refreshing the page

  //显示 atrri 对应的 vale
  const attrVal = useRef(null);
  const attrKey = useRef(null);
  const createNewAttrKey = useRef(null);
  const createNewAttrVal = useRef(null);

  const setValuesForAttrFromDbSelectForm = (e) => {
    // 如果不等于choose attribute的话，就var 一个 selectedAttr
    if (e.target.value !== "Choose attribute") {
      var selectedAttr = attributesFromDb.find(
        (item) => item.key === e.target.value
      );
      let valuesForAttrKeys = attrVal.current;
      // 如果选择的attri有东西，就remove attrikey的value，然后添加对应的新value
      if (selectedAttr && selectedAttr.value.length > 0) {
        while (valuesForAttrKeys.options.length) {
          valuesForAttrKeys.remove(0);
        }
        valuesForAttrKeys.options.add(new Option("Choose attribute value"));
        selectedAttr.value.map((item) => {
          valuesForAttrKeys.add(new Option(item));
          return "";
        });
      }
    }
  };

  const { id } = useParams();

  const navigate = useNavigate();

  // [id，imageremoved] id是啥 我忘记了，imageremoved就是 如果image removed is changed，然后useEffect will ba called once again
  // the produce will be fetched once again from the dtabase but without one image.
  // 懂了，就是如果这里的state variable change了，那么useEffect 就会 called once，然后product也会fetched once again，finally HTML 也会rendered once again
  useEffect(() => {
    fetchProduct(id)
      .then((product) => setProduct(product))
      .catch((er) => console.log(er));
  }, [id, imageRemoved, imageUploaded]);

  useEffect(() => {
    fetchProduct(id)
      .then((product) => setProduct(product))
      .catch((er) => console.log(er));
  }, [id, pdfRemoved, pdfUploaded, ]);

  /*   const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;

    // create object for inputs
    // 之前做过pull info了，所以如果改了value的话，这里读取就够了

    // 下面几行，做了个判定，我给新加了一个补货，如果不为零，则相加，如果为零则 只输出count里面的数字
    const stock = parseInt(form.count.value);
    const replenishment = parseInt(form.replenishment.value);

    let currentCount;

    if (replenishment) {
      currentCount = stock + replenishment;
    } else {
      currentCount = stock;
    }

    const formInputs = {
      name: form.name.value,
      description: form.description.value,
      count: currentCount,
      min: form.Min.value,
      max: form.Max.value,

      price: form.price.value,
      purchaseprice: form.PurchasePrice.value,
      slrcurrentbuyingprice: form.SLRCurrentBuyingPrice.value,

      slrsku: form.slrsku.value,
      ctlsku: form.ctlsku.value,

      suppliersku: form.SupplierSKU.value,
      supplier: form.supplier.value,

      category: form.category.value,
      attributesTable: [],
    };

    if (event.currentTarget.checkValidity() === true) {
      updateProductApiRequest(id, formInputs)
        .then((data) => {
          if (data.message === "product updated") navigate("/admin/products");
        })
        .catch((er) =>
          setUpdateProductResponseState({
            error: er.response.data.message
              ? er.response.data.message
              : er.response.data,
          })
        );
    }

    setValidated(true);
  }; */

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;

    const stock = [];
    for (
      let i = 0;
      i < document.querySelectorAll(".stockExisting").length;
      i++
    ) {
      const count = parseInt(document.getElementsByName(`count-${i}`)[0].value);
      const replenishment = parseInt(
        document.getElementsByName(`replenishment-${i}`)[0].value
      );
      const price = document.getElementsByName(`price-${i}`)[0].value;
      const attrs = document.getElementsByName(`attrs-${i}`)[0].value;
      const barcode = document.getElementsByName(`barcode-${i}`)[0].value;
      const ctlsku = document.getElementsByName(`ctlsku-${i}`)[0].value;
      const slrsku = document.getElementsByName(`slrsku-${i}`)[0].value;
      const suppliersku = document.getElementsByName(`suppliersku-${i}`)[0]
        .value;

      const finalCount = replenishment ? count + replenishment : count;

      stock.push({
        count: finalCount,
        price,
        attrs,
        barcode,
        ctlsku,
        slrsku,
        suppliersku,
      });
    }

    const stockNew = [];
    for (let i = 0; i < document.querySelectorAll(".stockNew").length; i++) {
      const count = document.getElementsByName(`newCount-${i}`)[0].value;
      const price = document.getElementsByName(`newPrice-${i}`)[0].value;
      const attrs = document.getElementsByName(`newAttrs-${i}`)[0].value;
      const barcode = document.getElementsByName(`newBarcode-${i}`)[0].value;
      const ctlsku = document.getElementsByName(`newCtlsku-${i}`)[0].value;
      const slrsku = document.getElementsByName(`newSlrsku-${i}`)[0].value;
      const suppliersku = document.getElementsByName(`newSuppliersku-${i}`)[0]
        .value;

      stockNew.push({
        count,
        price,
        attrs,
        barcode,
        ctlsku,
        slrsku,
        suppliersku,
      });
    }
    // check if stockNew is an array
    /* if (Array.isArray(stockNew) && stockNew.length > 0) {
      stock.push(...stockNew);
    } */
    const formInputs = {
      name: form.name.value,
      description: form.description.value,
      min: form.Min.value,
      max: form.Max.value,
      purchaseprice: form.PurchasePrice.value,
      slrcurrentbuyingprice: form.SLRCurrentBuyingPrice.value,
      supplier: form.supplier.value,
      category: form.category.value,
      attributesTable: [],
      stock: [...stock, ...stockNew],
    };

    if (event.currentTarget.checkValidity() === true) {
      updateProductApiRequest(id, formInputs)
        .then((data) => {
          if (data.message === "product updated") navigate("/admin/products");
        })
        .catch((er) =>
          setUpdateProductResponseState({
            error: er.response.data.message
              ? er.response.data.message
              : er.response.data,
          })
        );
    }

    setValidated(true);
  };

  //此处我们只是把attributes设置到main category里面
  useEffect(() => {
    let categoryOfEditedProduct = categories.find(
      (item) => item.name === product.category
    );
    if (categoryOfEditedProduct) {
      const mainCategoryOfEditedProduct =
        categoryOfEditedProduct.name.split("/")[0];
      const mainCategoryOfEditedProductAllData = categories.find(
        (categoryOfEditedProduct) =>
          categoryOfEditedProduct.name === mainCategoryOfEditedProduct
      );
      if (
        mainCategoryOfEditedProductAllData &&
        mainCategoryOfEditedProductAllData.attrs.length > 0
      ) {
        setAttributesFromDb(mainCategoryOfEditedProductAllData.attrs);
      }
    }
    // attri table 的数据读取
    setAttributesTable(product.attrs);
    //
    setCategoryChoosen(product.category);
  }, [product]);

  // 当main categories 改变的话，对应的atrributes框内的内容也会相应改变。
  const changeCategory = (e) => {
    const highLevelCategory = e.target.value.split("/")[0];
    const highLevelCategoryAllData = categories.find(
      (cat) => cat.name === highLevelCategory
    );
    if (highLevelCategoryAllData && highLevelCategoryAllData.attrs) {
      setAttributesFromDb(highLevelCategoryAllData.attrs);
    } else {
      setAttributesFromDb([]);
    }

    //
    setCategoryChoosen(e.target.value);
  };

  // 选择attributes之后，显示在attri table 里
  const attributeValueSelected = (e) => {
    //如果a target value is not choose attribute value， then
    if (e.target.value !== "Choose attribute value") {
      setAttributesTableWrapper(attrKey.current.value, e.target.value);
    }
  };

  const setAttributesTableWrapper = (key, val) => {
    setAttributesTable((attr) => {
      if (attr.length !== 0) {
        var keyExistsInOldTable = false;
        let modifiedTable = attr.map((item) => {
          if (item.key === key) {
            keyExistsInOldTable = true;
            item.value = val;
            return item;
          } else {
            return item;
          }
        });
        if (keyExistsInOldTable) return [...modifiedTable];
        else return [...modifiedTable, { key: key, value: val }];
      } else {
        return [{ key: key, value: val }];
      }
    });
  };

  // setAttributesTable（这里的都是call back）， talbe.filter（这里的都是filter的call back）
  const deleteAttribute = (key) => {
    setAttributesTable((table) => table.filter((item) => item.key !== key));
  };

  // 防止输入attri后，按下enter，直接跳转回product list
  const checkKeyDown = (e) => {
    if (e.code === "Enter") e.preventDefault();
  };

  // 13 好像是enter
  const newAttrKeyHandler = (e) => {
    e.preventDefault();
    setNewAttrKey(e.target.value);
    addNewAttributeManually(e);
  };

  // 好像是输入 新的attri，回车，然后会显示在列表里？？？？？？
  const newAttrValueHandler = (e) => {
    e.preventDefault();
    setNewAttrValue(e.target.value);
    addNewAttributeManually(e);
  };

  const addNewAttributeManually = (e) => {
    if (e.keyCode && e.keyCode === 13) {
      if (newAttrKey && newAttrValue) {
        // 把新的attr写入数据库
        reduxDispatch(
          saveAttributeToCatDoc(newAttrKey, newAttrValue, categoryChoosen)
        );
        // 232章
        setAttributesTableWrapper(newAttrKey, newAttrValue);
        e.target.value = "";
        createNewAttrKey.current.value = "";
        createNewAttrVal.current.value = "";
        setNewAttrKey(false);
        setNewAttrValue(false);
      }
    }
  };

  // add new product attrs in Stock
  const [rowCount, setRowCount] = useState(0);
  const handleNewProduct = () => {
    setRowCount(rowCount + 1);
  };
  const handleRemoveProduct = () => {
    setRowCount(rowCount - 1);
  };


/*   const [selectedStock, setSelectedStock] = useState(null);

  const handleDeleteStock = async (stockId) => {
    try {
      const res = await axios.delete(`/api/products/admin/${product._id}/stock/${stockId}`);
      setSelectedStock(null);
      console.log(res.data); // log the updated product to the console
      window.location.reload();
    } catch (err) {
      console.error(err.message);
    }
  };
  console.log('selectedStock',selectedStock); */

  const handleRemoveStock = (index) => {
    const newStock = [...product.stock];
    newStock.splice(index, 1);
    setProduct({ ...product, stock: newStock });
  };

  console.log('ProductStock',product.stock);
  return (
    <Container fluid>
      <Row className="justify-content-md-center mt-5">
        <Col md={1}>
          <Link to="/admin/products" className="btn btn-info my-3">
            Go Back
          </Link>
        </Col>
        <Col md={6}>
          <h1>Edit product</h1>
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            onKeyDown={(e) => checkKeyDown(e)}
          >
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                required
                type="text"
                defaultValue={product.name}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                required
                as="textarea"
                rows={3}
                defaultValue={product.description}
              />
            </Form.Group>

            <hr
              style={{
                color: "#000000",
                backgroundColor: "#000000",
                height: 0.5,
                borderColor: "#000000",
              }}
            />
            {product &&
              product.stock &&
              product.stock.map((item, index) => (
                <div key={item._id}>
                <>
                  <span className="stockExisting text-primary">Product: {index + 1}</span>
                  <Row>
                    <React.Fragment>
                      <Form.Group
                        as={Col}
                        md="3"
                        className="mb-3"
                        controlId={`formBasicCount-${index}`}
                      >
                        <Form.Label>Count</Form.Label>
                        <Form.Control
                          name={`count-${index}`}
                          required
                          type="number"
                          defaultValue={item.count}
                        />
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="2"
                        className="mb-3"
                        controlId={`formBasicReplenishment-${index}`}
                      >
                        <Form.Label>Replenishment</Form.Label>
                        <Form.Control
                          name={`replenishment-${index}`}
                          type="number"
                          placeholder="Entre Count"
                        />
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="3"
                        className="mb-3"
                        controlId={`formBasicAttrs-${index}`}
                      >
                        <Form.Label>Attrs</Form.Label>
                        <Form.Control
                          name={`attrs-${index}`}
                          required
                          type="text"
                          defaultValue={item.attrs}
                        />
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="3"
                        className="mb-3"
                        controlId={`formBasicBarcde-${index}`}
                      >
                        <Form.Label>Barcode</Form.Label>
                        <Form.Control
                          name={`barcode-${index}`}
                          required
                          type="text"
                          defaultValue={item.barcode}
                        />
                      </Form.Group>
                      <Form.Group as={Col} md="1" className="mb-3">
                      <i
                        className="bi bi-trash mt-3"
                        // onClick={() => setSelectedStock(item)}
                        onClick={() => handleRemoveStock(index)}
                        style={{
                          cursor: "pointer",
                        }}
                      ></i>
                    </Form.Group>
                    </React.Fragment>
                  </Row>
                  <Row>
                    <React.Fragment key={index}>
                      <Form.Group
                        as={Col}
                        md="3"
                        className="mb-3"
                        controlId={`formBasicPrice-${index}`}
                      >
                        <Form.Label>SLR Price</Form.Label>
                        <Form.Control
                          name={`price-${index}`}
                          required
                          type="text"
                          defaultValue={item.price}
                        />
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="3"
                        className="mb-3"
                        controlId={`formBasicSLRSKU-${index}`}
                      >
                        <Form.Label>SLR SKU</Form.Label>
                        <Form.Control
                          name={`slrsku-${index}`}
                          required
                          type="text"
                          defaultValue={item.slrsku}
                        />
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="3"
                        className="mb-3"
                        controlId={`formBasicCTLSKU-${index}`}
                      >
                        <Form.Label>CTL SKU</Form.Label>
                        <Form.Control
                          name={`ctlsku-${index}`}
                          required
                          type="text"
                          defaultValue={item.ctlsku}
                        />
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="3"
                        className="mb-3"
                        controlId={`formBasicSupplierSKU-${index}`}
                      >
                        <Form.Label>Supplier SKU</Form.Label>
                        <Form.Control
                          name={`suppliersku-${index}`}
                          required
                          type="text"
                          defaultValue={item.suppliersku}
                        />
                      </Form.Group>
                    </React.Fragment>
                  </Row>
                </>
                </div>
              ))}

            {/* add new product */}
            {[...Array(rowCount)].map((_, index) => (
              <>
                <span className="stockNew text-primary">
                  New Product: {index + 1}
                </span>
                <Row>
                  <React.Fragment key={index}>
                    <Form.Group
                      as={Col}
                      md="3"
                      className="mb-3"
                      controlId={`formBasicNewCount-${index}`}
                    >
                      <Form.Label>Count</Form.Label>
                      <Form.Control
                        name={`newCount-${index}`}
                        required
                        type="text"
                      />
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md="4"
                      className="mb-3"
                      controlId={`formBasicNewAttrs-${index}`}
                    >
                      <Form.Label>Attrs</Form.Label>
                      <Form.Control
                        name={`newAttrs-${index}`}
                        required
                        type="text"
                      />
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md="4"
                      className="mb-3"
                      controlId={`formBasicNewBarcde-${index}`}
                    >
                      <Form.Label>Barcode</Form.Label>
                      <Form.Control
                        name={`newBarcode-${index}`}
                        required
                        type="text"
                      />
                    </Form.Group>
                    <Form.Group as={Col} md="1" className="mb-3">
                      <i
                        className="bi bi-trash mt-3"
                        onClick={handleRemoveProduct}
                        style={{
                          cursor: "pointer",
                        }}
                      ></i>
                    </Form.Group>
                  </React.Fragment>
                </Row>
                <Row>
                  <React.Fragment key={index}>
                    <Form.Group
                      as={Col}
                      md="3"
                      className="mb-3"
                      controlId={`formBasicNewPrice-${index}`}
                    >
                      <Form.Label>SLR Price</Form.Label>
                      <Form.Control
                        name={`newPrice-${index}`}
                        required
                        type="text"
                      />
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md="3"
                      className="mb-3"
                      controlId={`formBasicNewSLRSKU-${index}`}
                    >
                      <Form.Label>SLR SKU</Form.Label>
                      <Form.Control
                        name={`newSlrsku-${index}`}
                        required
                        type="text"
                      />
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md="3"
                      className="mb-3"
                      controlId={`formBasicNewCTLSKU-${index}`}
                    >
                      <Form.Label>CTL SKU</Form.Label>
                      <Form.Control
                        name={`newCtlsku-${index}`}
                        required
                        type="text"
                      />
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md="3"
                      className="mb-3"
                      controlId={`formBasicNewSupplierSKU-${index}`}
                    >
                      <Form.Label>Supplier SKU</Form.Label>
                      <Form.Control
                        name={`newSuppliersku-${index}`}
                        required
                        type="text"
                      />
                    </Form.Group>
                  </React.Fragment>
                </Row>
              </>
            ))}

            <hr />
            <p
              onClick={handleNewProduct}
              style={{
                cursor: "pointer",
                textAlign: "center",
                fontStyle: "italic",
              }}
            >
              Add New Product
            </p>
            <hr />

            {/* {selectedStock && (
        <div>
          <p>Are you sure you want to delete this stock object?</p>
          <button onClick={() => handleDeleteStock(selectedStock._id)}>Delete</button>
          <button onClick={() => setSelectedStock(null)}>Cancel</button>
        </div>
      )} */}

            <Row>
              <Form.Group
                as={Col}
                md="3"
                className="mb-3"
                controlId="formBasicPurchasePrice"
              >
                <Form.Label>Purchase Price</Form.Label>
                <Form.Control
                  name="PurchasePrice"
                  required
                  type="text"
                  defaultValue={product.purchaseprice}
                />
              </Form.Group>
              <Form.Group
                as={Col}
                md="3"
                className="mb-3"
                controlId="formBasicSLRBuyingPrice"
              >
                <Form.Label>SLR Buying Price</Form.Label>
                <Form.Control
                  name="SLRCurrentBuyingPrice"
                  type="text"
                  defaultValue={product.slrcurrentbuyingprice}
                />
              </Form.Group>
              <Form.Group
                as={Col}
                md="3"
                className="mb-3"
                controlId="formBasicMin"
              >
                <Form.Label>Min</Form.Label>
                <Form.Control
                  name="Min"
                  required
                  type="number"
                  defaultValue={product.min}
                />
              </Form.Group>
              <Form.Group
                as={Col}
                md="3"
                className="mb-3"
                controlId="formBasicMax"
              >
                <Form.Label>Max</Form.Label>
                <Form.Control
                  name="Max"
                  required
                  type="number"
                  defaultValue={product.max}
                />
              </Form.Group>
            </Row>

            <Row>
              <Form.Group
                as={Col}
                md="6"
                className="mb-3"
                controlId="formBasicSupplier"
              >
                <Form.Label>Supplier</Form.Label>
                <Form.Control
                  name="supplier"
                  required
                  type="text"
                  defaultValue={product.supplier}
                />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formBasicCategory">
              <Form.Label>Category</Form.Label>
              <Form.Select
                required
                name="category"
                aria-label="Default select example"
                onChange={changeCategory}
              >
                {/* 自动选择产品本身的category */}
                <option value="Choose category">Choose category</option>
                {categories.map((category, idx) => {
                  // 如果产品的category name from 上面的那个user effect 等于 category name from iterated item category，就返回selected，否则就返回下面的
                  // 简而言之，就是对比一下，product.category跟category list，如果有匹配的，就select那个，如果没有，就恢复默认选项
                  return product.category === category.name ? (
                    <option selected key={idx} value={category.name}>
                      {category.name}
                    </option>
                  ) : (
                    <option key={idx} value={category.name}>
                      {category.name}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>

            {/* attributes */}
            {attributesFromDb.length > 0 && (
              <Row className="mt-5">
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicAttributes">
                    <Form.Label>Choose atrribute and set value</Form.Label>
                    <Form.Select
                      name="atrrKey"
                      aria-label="Default select example"
                      ref={attrKey}
                      onChange={setValuesForAttrFromDbSelectForm}
                    >
                      <option>Choose attribute</option>
                      {attributesFromDb.map((item, idx) => (
                        <Fragment key={idx}>
                          <option value={item.key}>{item.key}</option>
                        </Fragment>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group
                    className="mb-3"
                    controlId="formBasicAttributeValue"
                  >
                    <Form.Label>Attribute value</Form.Label>
                    <Form.Select
                      name="atrrVal"
                      aria-label="Default select example"
                      ref={attrVal}
                      onChange={attributeValueSelected}
                    >
                      <option>Choose attribute value</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            )}

            <Row>
              {/* 如果attribute table有东西 */}
              {attributesTable && attributesTable.length > 0 && (
                <Table hover>
                  <thead>
                    <tr>
                      <th>Attribute</th>
                      <th>Value</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attributesTable.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.key}</td>
                        <td>{item.value}</td>
                        <td>
                          <CloseButton
                            onClick={() => deleteAttribute(item.key)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicNewAttribute">
                  <Form.Label>Create new attribute</Form.Label>
                  <Form.Control
                    // 如果choose category，那么创建新的attribute就是disable
                    disabled={categoryChoosen === "Choose category"}
                    placeholder="first choose or create category"
                    name="newAttrKey"
                    type="text"
                    onKeyUp={newAttrKeyHandler}
                    // 这个required和下方的required联动： 一旦编辑其中一个，另一个input 要求有内容
                    required={newAttrValue}
                    ref={createNewAttrKey}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group
                  className="mb-3"
                  controlId="formBasicNewAttributeValue"
                >
                  <Form.Label>Attribute value</Form.Label>
                  <Form.Control
                    // 如果choose category，那么创建新的attribute value 就是disable
                    disabled={categoryChoosen === "Choose category"}
                    placeholder="first choose or create category"
                    required={newAttrKey}
                    name="newAttrValue"
                    type="text"
                    onKeyUp={newAttrValueHandler}
                    ref={createNewAttrVal}
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* 如果输入new attri 和 attri value的input里 同时有东西， 则显示alert */}
            <Alert show={newAttrKey && newAttrValue} variant="primary">
              After typing attribute key and value press enter on one of the
              field
            </Alert>

            {/* ********* Documents upload ********* */}
            <Form.Group controlId="formFileMultiple" className="mb-3 mt-3">
              {/* ********* images upload ********* */}
              <Form.Label>Images</Form.Label>
              <Row>
                {product.images &&
                  product.images.map((image, idx) => (
                    <Col key={idx} style={{ position: "relative" }} xs={3}>
                      <Image
                        crossOrigin="anonymous"
                        src={image.path ?? null}
                        fluid
                      />
                      <i
                        style={onHover}
                        onClick={() =>
                          imageDeleteHandler(image.path, id).then((data) =>
                            setImageRemoved(!imageRemoved)
                          )
                        }
                        className="bi bi-x text-danger"
                      ></i>
                    </Col>
                  ))}
              </Row>
              <Form.Control
                type="file"
                multiple
                onChange={(e) => {
                  setIsUploading("upload files in progress ...");
                  if (process.env.NODE_ENV !== "production") {
                    // to do: change to !==
                    uploadImagesApiRequest(e.target.files, id)
                      .then((data) => {
                        setIsUploading("upload file completed");
                        setImageUploaded(!imageUploaded);
                      })
                      .catch((er) =>
                        setIsUploading(
                          er.response.data.message
                            ? er.response.data.message
                            : er.response.data
                        )
                      );
                  } else {
                    uploadImagesCloudinaryApiRequest(e.target.files, id);
                    setIsUploading(
                      "upload file completed. wait for the result take effect, refresh also if neccassry"
                    );
                    setTimeout(() => {
                      setImageUploaded(!imageUploaded);
                    }, 5000);
                  }
                }}
              />
              {isUploading}

              {/* ********* Description PDF ********* */}
              <br />
              <Form.Label>PDF</Form.Label>
              <Row>
                {product.pdfs &&
                  product.pdfs.map((pdf, idx) => (
                    <Col key={idx} style={{ position: "relative" }} xs={3}>
                      <i className="bi bi-file-pdf">{pdf.path ?? null}</i>
                      <i
                        style={onHover}
                        onClick={() =>
                          pdfDeleteHandler(pdf.path, id).then((data) =>
                            setPdfRemoved(!pdfRemoved)
                          )
                        }
                        className="bi bi-x text-danger"
                      ></i>
                    </Col>
                  ))}
              </Row>
              <Form.Control
                type="file"
                multiple
                onChange={(e) => {
                  setIsUploading("upload files in progress ...");
                  if (process.env.NODE_ENV !== "production") {
                    // to do: change to !==
                    uploadPdfApiRequest(e.target.files, id)
                      .then((data) => {
                        setIsUploading("upload file completed");
                        setPdfUploaded(!pdfUploaded);
                      })
                      .catch((er) =>
                        setIsUploading(
                          er.response.data.message
                            ? er.response.data.message
                            : er.response.data
                        )
                      );
                  } else {
                    uploadPdfCloudinaryApiRequest(e.target.files, id);
                    setIsUploading(
                      "upload file completed. wait for the result take effect, refresh also if neccassry"
                    );
                    setTimeout(() => {
                      setPdfUploaded(!pdfUploaded);
                    }, 5000);
                  }
                }}
              />
              {isUploading}
            </Form.Group>

            <Button variant="primary" type="submit">
              UPDATE
            </Button>
            {updateProductResponseState.error ?? ""}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminEditProductPage;
