import "../pages/general.css";

const ProductForListComponent = ({
  productId,
  name,
  slrsku,
  price,
  images,
}) => {
  return (
    <div>
      <div className="mb-4">
        <div className="card mt-3">
          <a href={`/product-details/${productId}`} className="w-100">
            <div
              className="bg-image hover-zoom ripple img_hovf"
              data-mdb-ripple-color="light"
            >
              <img
                src={images[0] ? images[0].path : ""}
                className="w-100 img_hover"
                alt=""
              />
            </div>
            <div className="card-body">
              <h6 className="card-title mb-3 d-flex " style={{ height: "3.5em" }} class="text-uppercase">{name}</h6>
              <h6 className="card-price mb-3 mt-3 d-flex justify-content-center">
                <span>${price.toLocaleString()} </span>
              </h6>
              <div className="d-flex justify-content-center">
                {/* <a href={`/product-details/${productId}`} className="w-100"> */}
                <button className="product_card_btn w-100 lh-lg">VIEW PRODUCTS</button>
                {/* </a> */}
              </div>

            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductForListComponent;
