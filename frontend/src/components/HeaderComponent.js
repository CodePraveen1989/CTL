import {
  Navbar,
  Nav,
  Container,
  Badge,
  Form,
  Button,
  InputGroup,
} from "react-bootstrap";
import { logout } from "../redux/actions/userActions";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./page.css";

import { LinkContainer } from "react-router-bootstrap";
import { getCategories } from "../redux/actions/categoryActions";
import { useLocation } from 'react-router-dom';
import qs from 'qs';


const HeaderComponent = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userRegisterLogin);
  const itemsCount = useSelector((state) => state.cart.itemsCount);
  const cartSubtotal = useSelector((state) => state.cart.cartSubtotal);

  // const { categories } = useSelector((state) => state.getCategories);


  // const [searchCategoryToggle, setSearchCategoryToggle] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();



  const submitHandler = (e) => {
    if (e.keyCode && e.keyCode !== 13) return;
    e.preventDefault();
    if (searchQuery.trim()) {
        navigate(`/product-list?searchQuery=${searchQuery}`);
    }
  }
  
  const location = useLocation();
  // const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  // console.log('header query', location);

  return (
    <>
      {/* ************   Login/register, will move down to replace carts  ***************  */}
      <Navbar className='hd_bgc w-100'/* {location.pathname === "/login" ? 'loginHide hd_bgc w-100' : 'hd_bgc w-100'} */ expand="lg">
        <Container className="header_con" fluid>
          {/* ************   LOGO  ***************  */}
          <LinkContainer to="/">
            <Nav.Link className="hd_c logo_con w-25" href="/home">
              {/* <img src="./images/CTL-AUSB.png" alt="" className="nav_CTL"></img> */}
              <img
                src="/images/CTL-hex.png"
                alt=""
                className="rotate linear infinite"
              ></img>
              <img
                src="/images/CTL-hextext.png"
                alt=""
                className="hexagontext"
              ></img>
            </Nav.Link>
          </LinkContainer>

          {/* ************   Search Bar  ***************  */}
          <Nav className="me-auto input_search">
            <InputGroup className="mb-3 ">
              <Form.Control
                onKeyUp={submitHandler}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter description, product code or brand"
                aria-label="search bar"
                aria-describedby="basic-addon2"
                bg="white"
                className="mt-3"
              />
              <Button
                /* variant="outline-secondary" */
                id="button-addon2"
                className="mt-3 CTL_btn"
                onClick={submitHandler}
              >
                <i className="search-icon bi bi-search "></i>
              </Button>
            </InputGroup>
          </Nav>

          {/* ************   User and Carts  ***************  */}
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            {/* 折叠区间 */}
            <Nav>
              {userInfo.isAdmin ? (
                <LinkContainer to="/admin/orders">
                  <Nav.Link>Admin</Nav.Link>
                </LinkContainer>
              ) : userInfo.name && !userInfo.isAdmin ? (
                <>
                  <div className="w3c_dropdown mt-2 me-2">
                    <div className="users_initial">{`${userInfo.name.charAt(0)}${userInfo.lastName.charAt(0)}`}</div>
                    <div className="users_dropdown">
                      <div className="users_row">
                        <div className="users_column">
                          <li>
                            <a href="/user" className="hd_c">
                              My Profile
                            </a>
                          </li>
                          <li>
                            <a href="/user/my-orders" className="hd_c">
                              Orders
                            </a>
                          </li>
                          <li
                            className="hd_c"
                            onClick={() => dispatch(logout())}
                            style={{ cursor: "pointer" }}
                          >
                            Log out
                          </li>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ************   normal cart  ***************  */}
                  <LinkContainer className="hd_c" to="/cart">
                    <Nav.Link>
                      <i
                        className="bi bi-cart3 hd_c"
                        style={{ fontSize: "1.5rem" }}
                      ></i>
                      <Badge pill bg="danger" style={{ fontSize: "0.6rem" }}>
                        {itemsCount === 0 ? "" : "$ "+cartSubtotal.toLocaleString()}
                      </Badge>
                    </Nav.Link>
                  </LinkContainer>

                  {/* ************   mining cart  ***************  */}
{/*                   <LinkContainer className="hd_c" to="/cart">
                    <Nav.Link className="mining_cart">
                      <i
                        className="bi bi-minecart-loaded hd_c"
                        style={{ fontSize: "1.5rem" }}
                      ></i>
                      <Badge pill bg="danger" style={{ fontSize: "0.6rem" }}>
                        25000
                      </Badge>
                    </Nav.Link>
                  </LinkContainer> */}
                </>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link>Login</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link>Register</Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default HeaderComponent;
