/* 0【阅读进度，勿删！Reading progress, do not delete!】 */
/* $ */

import { Row, Col, Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import AdminLinksComponent from "../../../components/admin/AdminLinksComponent";
import { TableHeader, Pagination, Search } from "../../../components/DataTable";

import React, { useEffect, useState, useMemo } from "react";

const ProductsPageComponent = ({ fetchProducts, deleteProduct }) => {
  const [products, setProducts] = useState([]);
  const [productDeleted, setProductDeleted] = useState(false);

  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState({ field: "", order: "" });

  // items per page
  const ITEMS_PER_PAGE_OPTIONS = [10, 20, 40, 60, 100]; // options for dropdown
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE_OPTIONS[2]); // set default items per page to 20

  const ITEMS_PER_PAGE = itemsPerPage;

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value));
  };

  // 这里需要去到product controller 找到 adminGetProducts 改一些数据，才能显示出来
  // 因为数据库太大的话，我们限制 get products的数据，就能faster
  const headers = [
    { name: "No#", field: "index", sortable: false },
    { name: "Product Name", field: "name", sortable: true },
    { name: "Product Attrs", field: "attrs", sortable: true },
    { name: "Price", field: "price", sortable: true },
    { name: "Stock", field: "count", sortable: true },
    { name: "CTLsku", field: "ctlsku", sortable: true },
    { name: "Category", field: "category", sortable: true },
    { name: "Edit/Delete", field: "", sortable: false },
  ];

  const productsData = useMemo(() => {
    let computedProducts = products;
    console.log("computedProducts", products);

    if (search) {
      computedProducts = computedProducts.filter(
        (products) =>
          products.name.toLowerCase().includes(search.toLowerCase()) ||
          products.category.toLowerCase().includes(search.toLowerCase()) ||
          products.stock.some(stockItem =>
            stockItem.ctlsku.toLowerCase().includes(search.toLowerCase()) ||
            stockItem.slrsku.toLowerCase().includes(search.toLowerCase()) ||
            stockItem.barcode.toLowerCase().includes(search.toLowerCase())
          )
      );
    }

    /* const newCount = products.map((product) => product.slrsku);
    console.log(newCount); */

    setTotalItems(computedProducts.length);

    //Sorting products
    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedProducts = computedProducts.sort((a, b) => {
        const fieldA = a[sorting.field];
        const fieldB = b[sorting.field];

        if (typeof fieldA === "number" && typeof fieldB === "number") {
          return reversed * (fieldA - fieldB);
        } else if (typeof fieldA === "string" && typeof fieldB === "string") {
          return reversed * fieldA.localeCompare(fieldB);
        } else {
          // If field types are different, compare their string representations
          return reversed * String(fieldA).localeCompare(String(fieldB));
        }
      });
    }

    //Current Page slice
    return computedProducts.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [products, currentPage, search, sorting]);

  const deleteHandler = async (productId) => {
    if (window.confirm("Are you sure?")) {
      const data = await deleteProduct(productId);
      if (data.message === "product removed") {
        setProductDeleted(!productDeleted);
      }
    }
  };

  useEffect(() => {
    const abctrl = new AbortController();
    fetchProducts(abctrl)
      .then((res) => setProducts(res))
      .catch((er) =>
        setProducts([
          {
            name: er.response.data.message
              ? er.response.data.message
              : er.response.data,
          },
        ])
      );
    return () => abctrl.abort();
  }, [productDeleted, itemsPerPage]);

  return (
    <Row className="m-5">
      <Col md={2}>
        <AdminLinksComponent />
      </Col>
      <Col md={10}>
        <h1>
          Product List{" "}
          <LinkContainer to="/admin/create-new-product">
            <Button variant="primary" size="lg">
              Create new
            </Button>
          </LinkContainer>
        </h1>
        <div className="row">
          <div className="col-md-6 d-flex align-items-center">
            <Pagination
              total={totalItems}
              itemsPerPage={ITEMS_PER_PAGE}
              currentPage={currentPage}
              onPageChange={(page) => setCurrentPage(page)}
            />
            <select
              className="ms-2"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
            >
              {ITEMS_PER_PAGE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option} per page
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6 d-flex flex-row-reverse">
            <Search
              onSearch={(value) => {
                setSearch(value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
        <table className="table table-striped">
          <TableHeader
            headers={headers}
            onSorting={(field, order) => setSorting({ field, order })}
          />
          <tbody>
            {/* 这里需要去到product controller 找到adminGetProducts 改一些数据，才能显示出来 */}
            {productsData.map((item, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{item.name}</td>
                <td>
                  {item.stock.map((stockItem) => (
                    <div key={stockItem.ctlsku}>{stockItem.attrs}</div>
                  ))}
                </td>
                <td>
                  {item.stock.map((stockItem) => (
                    <div key={stockItem.ctlsku}>${stockItem.price}</div>
                  ))}
                </td>
                <td>
                  {item.stock.map((stockItem) => (
                    <div key={stockItem.ctlsku}>{stockItem.count}</div>
                  ))}
                </td>
                <td>
                  {item.stock.map((stockItem) => (
                    <div key={stockItem.ctlsku}>{stockItem.ctlsku}</div>
                  ))}
                </td>
                <td>{item.category}</td>
                <td>
                  <LinkContainer to={`/admin/edit-product/${item._id}`}>
                    <Button className="btn-sm btn-light">
                      <i className="bi bi-pencil-square"></i>
                    </Button>
                  </LinkContainer>
                  {" / "}
                  <Button
                    variant="danger"
                    className="btn-sm btn-light"
                    onClick={() => deleteHandler(item._id)}
                  >
                    <i className="bi bi-x-circle"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="col-md-6">
          <Pagination
            total={totalItems}
            itemsPerPage={ITEMS_PER_PAGE}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </Col>
    </Row>
  );
};

export default ProductsPageComponent;
