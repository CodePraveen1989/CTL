import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// publicly available pages:
import HomePage from "./pages/HomePage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ProductListPage from "./pages/ProductListPage";
import CartPage from "./pages/CartPage";
import Unfortunately from "./pages/unfortunately";

/* import LoginRegisterPage from "./pages/LoginRegisterPage"; */
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import LoginRegisterPage from "./pages/LoginRegisterPage";
import SplashPage from "./pages/SplashPage";
import FaqPage from "./pages/FaqPage";
import TermsConditions from "./pages/TermsConditions";
import PrivacyPolicy from "./pages/privacypolicy";
import CallbackService from "./pages/callbackservice";

import ProtectedRoutesComponent from "./components/ProtectedRoutesComponent";

//user components:
//如果要渲染Chat就用route chat包裹每一个要加载chat的页面
import RoutesWithHeaderFtNavb from "./components/user/RoutesWithHeaderFtNavb";

// protected user pages:
import UserProfilePage from "./pages/user/UserProfilePage";
import UserOrdersPage from "./pages/user/UserOrdersPage";
import UserCartDetailsPage from "./pages/user/UserCartDetailsPage";
import UserOrderDetailsPage from "./pages/user/UserOrderDetailsPage";
import UserPasswordPage from "./pages/user/UserPasswordPage";

import EmailVerify from "./components/user/EmailVerify";

// protected admin pages:
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import AdminProductsPage from "./pages/admin/AdminProductsPage";
import AdminCreateProductPage from "./pages/admin/AdminCreateProductPage";
import AdminEditProductPage from "./pages/admin/AdminEditProductPage";
import AdminEditUserPage from "./pages/admin/AdminEditUserPage";
import AdminOrdersPage from "./pages/admin/AdminOrdersPage";
import AdminOrderDetailsPage from "./pages/admin/AdminOrderDetailsPage";
import AdminAnalyticsPage from "./pages/admin/AdminAnalyticsPage";
import ScrollToTop from "./utils/ScrollToTop";

//components
import HeaderComponent from "./components/HeaderComponent";
import Navb from "./components/Navb";
import FooterComponent from "./components/FooterComponent";

function App() {
  return (
    <>
      <Router>
        <ScrollToTop />

        {/* V6里面 routes 替换了 switch，而且 route可以套route，login和unfor单独render，header ft navb 放在ProtectedRoutesComponent里渲染了 */}
        <Routes>
          <Route path="/unfortunately" element={<Unfortunately />} />
          <Route path="/login" element={<SplashPage />} />
          <Route path="/user/:id/verify/:token" element={<EmailVerify />} />

          {/* publicly available routes: */}
          {/* header footer navbar are in ProtectedRoutesComponent */}
          <Route element={<ProtectedRoutesComponent admin={false} />}>
            <Route path="/" element={<HomePage />} />
            {/* <Route path="/login" element={<LoginPage />} /> */}

            <Route path="/register" element={<RegisterPage />} />
            <Route path="/product-list" element={<ProductListPage />} />
            <Route
              path="/product-details/:id"
              element={<ProductDetailsPage />}
            />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/FaqPage" element={<FaqPage />} />
            <Route path="/TermsConditions" element={<TermsConditions />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route path="/callbackservice" element={<CallbackService />} />

            <Route path="*" element="Page not exists 404" />
          </Route>
          {/* user protected routes: */}
          <Route element={<ProtectedRoutesComponent admin={false} />}>
            <Route path="/user" element={<UserProfilePage />} />
            <Route path="/user/password" element={<UserPasswordPage />} />
            <Route path="/user/my-orders" element={<UserOrdersPage />} />
            <Route
              path="/user/cart-details"
              element={<UserCartDetailsPage />}
            />
            <Route
              path="/user/order-details/:id"
              element={<UserOrderDetailsPage />}
            />
          </Route>

          {/* admin protected routes: */}

          <Route element={<ProtectedRoutesComponent admin={true} />}>
            <Route path="/admin/users" element={<AdminUsersPage />} />
            <Route
              path="/admin/edit-user/:id"
              element={<AdminEditUserPage />}
            />
            <Route path="/admin/products" element={<AdminProductsPage />} />
            <Route
              path="/admin/create-new-product"
              element={<AdminCreateProductPage />}
            />
            <Route
              path="/admin/edit-product/:id"
              element={<AdminEditProductPage />}
            />
            <Route path="/admin/orders" element={<AdminOrdersPage />} />
            <Route
              path="/admin/order-details/:id"
              element={<AdminOrderDetailsPage />}
            />
            <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
          </Route>

          <Route path="*" element="Page not exists 404" />
        </Routes>

        {/* <FooterComponent /> */}
      </Router>
    </>
  );
}

export default App;
