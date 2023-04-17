import { Carousel, Button, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import "./page.css";
import "./promotion.css";
// import "../../public/images2/";


const ProductsPromotionComponent = () => {


  return (
    <>

      {/* <marquee scrollamount="10" > */}


      <ul id="rig">
        <li>
          <a class="rig-cell" href="http://localhost:3000/product-list?categoryName=PPE">
            {/* <img class="rig-img" src="images2/sample_1.mp4" /> */}
            <video class="rig-img" controls autoPlay muted loop ><source src="images2/sample_1.mp4" type="video/mp4" />
            </video>
            <span class="rig-overlay"></span>
            <span class="rig-text">PPE on Specials!!!!</span>
          </a>
        </li>
        <li>
          <a class="rig-cell" href="http://localhost:3000/product-list?categoryName=PPE&subCategoryName=EYE-PROTECTION">
            {/* <img class="rig-img" src="images2/sample_2.mp4" /> */}
            <video class="rig-img" controls autoPlay muted loop><source src="images2/sample_2.mp4" type="video/mp4" />
            </video>
            <span class="rig-overlay"></span>
            <span class="rig-text">Eye Care Combo!!!!</span>
          </a>
        </li>
        <li>
          <a class="rig-cell" href="http://localhost:3000/product-list?categoryName=SITE-SAFETY">
            {/* <img class="rig-img" src="images2/sample_3.mp4" /> */}
            <video class="rig-img" controls autoPlay muted loop><source src="images2/sample_3.mp4" type="video/mp4" />
            </video>
            <span class="rig-overlay"></span>
            <span class="rig-text">Site Safty New Arrivals!!!</span>
          </a>
        </li>

      </ul>

      {/* </marquee> */}


    </>
  );

};

export default ProductsPromotionComponent;
