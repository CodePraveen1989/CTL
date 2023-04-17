import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import React, { Fragment } from "react";
import "./EmailVerify.css";

const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState(false);
  const param = useParams();

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `/api/users/${param.id}/verify/${param.token}`;
        const { data } = await axios.get(url);
        console.log(data);
        setValidUrl(true);
      } catch (error) {
        console.log(error);
        setValidUrl(true);
      }
    };
    verifyEmailUrl();
  }, [param]);

  return (
    <Fragment>
      {validUrl ? (
        <div className="verifyEmail">
          <img
            src="/images/CTL-hex.png"
            alt=""
            className="verified_logo rotate linear infinite mb-5"
          ></img>
          <h1>Email verified successfully</h1>
          <Link to="/login">
            <button className="blue_btn">Login</button>
          </Link>
        </div>
      ) : (
        <h1>404 Not Found</h1>
      )}
    </Fragment>
  );
};

export default EmailVerify;
