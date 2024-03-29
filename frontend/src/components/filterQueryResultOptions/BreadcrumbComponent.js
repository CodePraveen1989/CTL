import React from "react";
import { useLocation } from "react-router-dom";
import qs from "qs";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import "./Filter.css";

const BreadcrumbComponent = () => {
  const location = useLocation();
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  console.log("woshi query", query);

  /* 下面这个就是拼接，非空判断，！！xxxxx,如果有值，就设置'' 如果没值就 hide it */
  return (
    <Breadcrumb className="breadCB">
      {/* <Breadcrumb.Item href="/">
        <i className="bi bi-house-fill active" />
      </Breadcrumb.Item> */}
      <Breadcrumb.Item
        className={!!query.categoryName ? "active" : "hideit"}
        href={"/product-list?categoryName=" + query.categoryName}
      >
        <span className={!!query.subCategoryName ? " " : "Highlight"}>{!!query.categoryName ? query.categoryName.replace(/-/g, " ") : ""}</span>
      </Breadcrumb.Item>
      <Breadcrumb.Item
        className={!!query.subCategoryName ? "active" : "hideit"}
        href={
          "/product-list?categoryName=" +
          query.categoryName +
          "&subCategoryName=" +
          query.subCategoryName
        }
      >
        <span className={!!query.childCategoryName ? " " : "Highlight"}>{!!query.subCategoryName ? query.subCategoryName.replace(/-/g, " ") : ""}</span>
      </Breadcrumb.Item>
      <Breadcrumb.Item
        className={!!query.childCategoryName ? "active" : "hideit"}
        href={
          "/product-list?categoryName=" +
          query.categoryName +
          "&subCategoryName=" +
          query.subCategoryName +
          "&childCategoryName=" +
          query.childCategoryName
        }
      >
        <span className={!!query.fourCategoryName ? "" : "Highlight"}>{!!query.childCategoryName ? query.childCategoryName.replace(/-/g, " ") : ""}</span>
      </Breadcrumb.Item>
      <Breadcrumb.Item
        className={!!query.fourCategoryName ? "active" : "hideit"}
        href={
          "/product-list?categoryName=" +
          query.categoryName +
          "&subCategoryName=" +
          query.subCategoryName +
          "&childCategoryName=" +
          query.childCategoryName +
          "&fourCategoryName=" +
          query.fourCategoryName
        }
      >
        <span className={!!query.fourCategoryName ? "Highlight" : ""}>{!!query.fourCategoryName ? query.fourCategoryName.replace(/-/g, " ") : ""}</span>
      </Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default BreadcrumbComponent;
