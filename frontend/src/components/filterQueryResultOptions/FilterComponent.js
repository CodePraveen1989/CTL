import React from "react";
import { useLocation } from "react-router-dom";
import qs from "qs";
import "./Filter.css";

const FilterComponent = () => {
  const ColoredLine = (/* { color } */) => (
    <hr
      style={{
        color: "grey",
        backgroundColor: "grey",
        height: 0.1,
        margin: 0,
      }}
    />
  );

  /*   var nav_color = {
      2: "subCat",
      3: "childCat",
    }; */

  var PPE1 = "/product-list?categoryName=PPE";
  var PPE2 = [
    {
      label: "PROTECTIVE HEADWEAR",
      type: 2,
      link: PPE1 + "&subCategoryName=PROTECTIVE-HEADWEAR",
    },
    {
      label: "HEARING PROTECTION",
      type: 2,
      link: PPE1 + "&subCategoryName=HEARING-PROTECTION",
    },
    { label: "HYDRATION", type: 2, link: PPE1 + "&subCategoryName=HYDRATION" },
    {
      label: "EYE PROTECTION",
      type: 2,
      link: PPE1 + "&subCategoryName=EYE-PROTECTION",
    },
    {
      label: "RESPIRATORY GEAR",
      type: 2,
      link: PPE1 + "&subCategoryName=RESPIRATORY-GEAR",
    },
    {
      label: "HAND PROTECTION",
      type: 2,
      link: PPE1 + "&subCategoryName=HAND-PROTECTION",
    },
    {
      label: "PROTECTIVE WORKWEAR",
      type: 2,
      link: PPE1 + "&subCategoryName=PROTECTIVE-WORKWEAR",
    },
    {
      label: "SUN PROTECTION",
      type: 2,
      link: PPE1 + "&subCategoryName=SUN-PROTECTION",
    },
    {
      label: "FACE PROTECTION",
      type: 2,
      link: PPE1 + "&subCategoryName=FACE-PROTECTION",
    },
    {
      label: "DISPOSABLE PROTECTION",
      type: 2,
      link: PPE1 + "&subCategoryName=DISPOSABLE-PROTECTION",
    },
  ];

  var SS1 = "/product-list?categoryName=SITE-SAFETY";
  var SS2 = [
    { label: "SPILL KITS", type: 2, link: SS1 + "&subCategoryName=SPILL-KITS" },
    { label: "FIRST AID", type: 2, link: SS1 + "&subCategoryName=FIRST-AID" },
    {
      label: "SPILL CONTAINMENT",
      type: 2,
      link: SS1 + "&subCategoryName=SPILL-CONTAINMENT",
    },
    {
      label: "ACCESSORIES",
      type: 2,
      link: SS1 + "&subCategoryName=ACCESSORIES",
    },
    {
      label: "EMERGENCY SHOWERS & EYEWASH",
      type: 2,
      link: SS1 + "&subCategoryName=EMERGENCY-SHOWERS-EYEWASH",
    },
  ];

  var FASTENERS1 = "/product-list?categoryName=FASTENERS";
  var FASTENERS2 = [
    {
      label: "HIGH TENSILE FASTENERS",
      type: 2,
      link: FASTENERS1 + "&subCategoryName=HIGH-TENSILE-FASTENERS",
    },
    {
      label: "STAINLESS HARDWEAR",
      type: 2,
      link: FASTENERS1 + "&subCategoryName=STAINLESS-HARDWEAR",
    },
    { label: "KITS", type: 2, link: FASTENERS1 + "&subCategoryName=KITS" },
    {
      label: "STAINLESS FASTENERS",
      type: 2,
      link: FASTENERS1 + "&subCategoryName=STAINLESS-FASTENERS",
    },
    {
      label: "LOW TENSILE FASTENERS",
      type: 2,
      link: FASTENERS1 + "&subCategoryName=LOW-TENSILE-FASTENERS",
    },
    { label: "SCREWS", type: 2, link: FASTENERS1 + "&subCategoryName=SCREWS" },
  ];

  var HAND_TOOLS = "/product-list?categoryName=HAND-TOOLS";
  var HT2 = [
    {
      label: "FASTENING KITS ",
      type: 2,
      link: HAND_TOOLS + "&subCategoryName=FASTENING-KITS",
    },
    {
      label: "SOFT STORAGE",
      type: 2,
      link: HAND_TOOLS + "&subCategoryName=SOFT-STORAGE",
    },
    {
      label: "HARD STORAGE",
      type: 2,
      link: HAND_TOOLS + "&subCategoryName=HARD-STORAGE",
    },
    {
      label: "MEASURING",
      type: 2,
      link: HAND_TOOLS + "&subCategoryName=MEASURING",
    },
    { label: "LAYOUT", type: 2, link: HAND_TOOLS + "&subCategoryName=LAYOUT" },
    {
      label: "PIPE TOOLS WRENCHES",
      type: 2,
      link: HAND_TOOLS + "&subCategoryName=PIPE-TOOLS-WRENCHES",
    },
    {
      label: "CUTTING TOOLS",
      type: 2,
      link: HAND_TOOLS + "&subCategoryName=CUTTING-TOOLS",
    },
    {
      label: "STRIKING DEMOLITION",
      type: 2,
      link: HAND_TOOLS + "&subCategoryName=STRIKING-DEMOLITION",
    },
    {
      label: "CABLE FEEDING",
      type: 2,
      link: HAND_TOOLS + "&subCategoryName=CABLE-FEEDING",
    },
    {
      label: "HAND TOOLS KIT",
      type: 2,
      link: HAND_TOOLS + "&subCategoryName=HAND-TOOLS-KIT",
    },
    {
      label: "FASTENING",
      type: 2,
      link: HAND_TOOLS + "&subCategoryName=FASTENING",
    },
    {
      label: "PLIERS",
      type: 2,
      link: HAND_TOOLS + "&subCategoryName=PLIERS"
    },
    {
      label: "KNIVES",
      type: 2,
      link: HAND_TOOLS + "&subCategoryName=KNIVES"
    },
  ];

  var INDUSTRIAL = "/product-list?categoryName=INDUSTRIAL";
  var IND2 = [
    {
      label: "ABRASIVES & CUTTING",
      type: 2,
      link: INDUSTRIAL + "&subCategoryName=ABRASIVES-CUTTING",
    },
    {
      label: "DRILLING",
      type: 2,
      link: INDUSTRIAL + "&subCategoryName=DRILLING",
    },
    {
      label: "LUBRICATION & EQUIPMENT",
      type: 2,
      link: INDUSTRIAL + "&subCategoryName=LUBRICATION-EQUIPMENT",
    },
    {
      label: "PAINT,EQUIPMENT & SUPPLIES",
      type: 2,
      link: INDUSTRIAL + "&subCategoryName=PAINT-EQUIPMENT-SUPPLIES",
    },
    {
      label: "PUMPS,VALVES & PARTS",
      type: 2,
      link: INDUSTRIAL + "&subCategoryName=PUMPS-VALVES-PARTS",
    },
    {
      label: "HOSES & FITTINGS",
      type: 2,
      link: INDUSTRIAL + "&subCategoryName=HOSES-FITTINGS",
    },
  ];

  var CHEMICALS = "/product-list?categoryName=ELECTRICAL";


  var ELECTRICAL1 = "/product-list?categoryName=ELECTRICAL";
  var ELECTRICAL2 = [
    { label: "CABLES", type: 2, link: ELECTRICAL1 + "&subCategoryName=CABLES" },
    { label: "ENCLOSURES", type: 2, link: ELECTRICAL1 + "&subCategoryName=ENCLOSURES" },
  ];



  var testaaa = ELECTRICAL1 + "&subCategoryName=ABCDEFG";
  console.log("testaaaa", testaaa.slice(54));

  const location = useLocation();
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  return (
    <div className="accordion_container">
      {/* PPE */}
      <div className="accordion">
        <div className="accordion-header">
          <a
            className="btn"
            data-bs-toggle="collapse"
            href="#collapseOne"
            aria-expanded="true"
          >
            PPE
          </a>
        </div>
        <div
          id="collapseOne"
          className={
            query.categoryName === "PPE" ? "collapse show" : "collapse"
          }
          data-bs-parent="#accordion"
        >
          <div className="accordion-body">
            {PPE2.map((item) => {
              return (
                <li
                  key={item.link}
                  className={
                    query.subCategoryName === item.link.slice(47)
                      ? "activeLabel subCatFilter"
                      : "subCatFilter"
                  }
                >
                  <a href={item.link}>{item.label}</a>
                  <ColoredLine />
                </li>
              );
            })}
          </div>
        </div>
      </div>

      {/* SITE SAFETY */}
      <div className="accordion">
        <div className="accordion-header">
          <a
            className="collapsed btn"
            data-bs-toggle="collapse"
            href="#collapseTwo"
          >
            SITE SAFETY
          </a>
        </div>
        <div
          id="collapseTwo"
          className={
            query.categoryName === "SITE-SAFETY" ? "collapse show" : "collapse"
          }
          data-bs-parent="#accordion"
        >
          <div className="accordion-body">
            {SS2.map((item) => {
              return (
                <li
                  key={item.link}
                  className={
                    query.subCategoryName === item.link.slice(55)
                      ? "activeLabel subCatFilter"
                      : "subCatFilter"
                  }
                >
                  <a href={item.link}>{item.label}</a>
                  <ColoredLine />
                </li>
              );
            })}
          </div>
        </div>
      </div>

      {/* FASTENERS */}
      <div className="accordion">
        <div className="accordion-header">
          <a
            className="collapsed btn"
            data-bs-toggle="collapse"
            href="#collapseSeven"
          >
            FASTENERS
          </a>
        </div>
        <div
          id="collapseSeven"
          className={
            query.categoryName === "FASTENERS" ? "collapse show" : "collapse"
          }
          data-bs-parent="#accordion"
        >
          <div className="accordion-body">
            {FASTENERS2.map((item) => {
              return (
                <li
                  key={item.link}
                  className={
                    query.subCategoryName === item.link.slice(53)
                      ? "activeLabel subCatFilter"
                      : "subCatFilter"
                  }
                >
                  <a href={item.link}>{item.label}</a>
                  <ColoredLine />
                </li>
              );
            })}
          </div>
        </div>
      </div>

      {/* HAND TOOLS */}
      <div className="accordion">
        <div className="accordion-header">
          <a
            className="collapsed btn"
            data-bs-toggle="collapse"
            href="#collapseFive"
          >
            HAND TOOLS
          </a>
        </div>
        <div
          id="collapseFive"
          className={
            query.categoryName === "HAND-TOOLS" ? "collapse show" : "collapse"
          }
          data-bs-parent="#accordion"
        >
          <div className="accordion-body">
            {HT2.map((item) => {
              return (
                <li
                  key={item.link}
                  className={
                    query.subCategoryName === item.link.slice(54)
                      ? "activeLabel subCatFilter"
                      : "subCatFilter"
                  }
                >
                  <a href={item.link}>{item.label}</a>
                  <ColoredLine />
                </li>
              );
            })}
          </div>
        </div>
      </div>

      {/* INDUSTRIAL */}
      <div className="accordion">
        <div className="accordion-header">
          <a
            className="collapsed btn"
            data-bs-toggle="collapse"
            href="#collapseThree"
          >
            INDUSTRIAL
          </a>
        </div>
        <div
          id="collapseThree"
          className={
            query.categoryName === "INDUSTRIAL" ? "collapse show" : "collapse"
          }
          data-bs-parent="#accordion"
        >
          <div className="accordion-body">
            {IND2.map((item) => {
              return (
                <li
                  key={item.link}
                  className={
                    query.subCategoryName === item.link.slice(55)
                      ? "activeLabel subCatFilter"
                      : "subCatFilter"
                  }
                >
                  <a href={item.link}>{item.label}</a>
                  <ColoredLine />
                </li>
              );
            })}
          </div>
        </div>
      </div>

      {/* CHEMICALS */}
      <div className="accordion">
        <div className="accordion-header">
          <a
            className="collapsed btn"
            data-bs-toggle="collapse"
            href="#collapseEight"
          >
            CHEMICALS
          </a>
        </div>
        <div
          id="collapseEight"
          className={
            query.categoryName === "CHEMICALS" ? "collapse show" : "collapse"
          }
          data-bs-parent="#accordion"
        >
          {/* <div className="accordion-body">
            {CHEMICALS2.map((item) => {
              return (
                <li
                  key={item.link}
                  className={
                    query.subCategoryName === item.link.slice(54)
                      ? "activeLabel subCatFilter"
                      : "subCatFilter"
                  }
                >
                  <a href={item.link}>{item.label}</a>
                  <ColoredLine />
                </li>
              );
            })}
          </div> */}
        </div>
      </div>

      {/* ELECTRICAL */}
      <div className="accordion">
        <div className="accordion-header">
          <a
            className="collapsed btn"
            data-bs-toggle="collapse"
            href="#collapseEight"
          >
            ELECTRICAL
          </a>
        </div>
        <div
          id="collapseEight"
          className={
            query.categoryName === "ELECTRICAL" ? "collapse show" : "collapse"
          }
          data-bs-parent="#accordion"
        >
          <div className="accordion-body">
            {ELECTRICAL2.map((item) => {
              return (
                <li
                  key={item.link}
                  className={
                    query.subCategoryName === item.link.slice(54)
                      ? "activeLabel subCatFilter"
                      : "subCatFilter"
                  }
                >
                  <a href={item.link}>{item.label}</a>
                  <ColoredLine />
                </li>
              );
            })}
          </div>
        </div>
      </div>



    </div>
  );
};

export default FilterComponent;
