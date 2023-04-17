import React, { useState, useEffect } from "react";
import axios from "axios";

const QuoteComponent = () => {
  const [formData, setFormData] = useState({
    from: "",
    productName: "",
    description: "",
    image: null,
  });

  const [isSending, setIsSending] = useState(false);
  const [dots, setDots] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { from, productName, description, image } = formData;

  useEffect(() => {
    let interval = null;

    if (isSending) {
      interval = setInterval(() => {
        setDots((dots) => {
          if (dots.length === 6) {
            return "";
          }
          return dots + ".";
        });
      }, 500);
    } else {
      clearInterval(interval);
      setDots("");
    }

    return () => clearInterval(interval);
  }, [isSending]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const formDataToSend = new FormData();
    formDataToSend.append("from", from);
    formDataToSend.append("productName", productName);
    formDataToSend.append("description", description);
    formDataToSend.append("image", image);
    try {
      setIsSending(true);
      const res = await axios.post("/api/sendemail", formDataToSend, config);
      console.log(res.data);
      setIsSending(false);
      setFormData({
        from: "",
        productName: "",
        description: "",
        image: null,
      });
      setSuccessMessage("Email sent successfully");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="container border w-75 ms-5 p-3 mt-2">
        <br />
        <h3 className="text-center">Looking for somthing else?</h3>
        <h3 className="text-center">Please fill in the form, We will find it for you!</h3>
        <br />
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="form-group">
            <input
              className="form-control mb-3"
              type="text"
              name="from"
              required
              placeholder="From:"
              value={from}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control mb-3"
              type="text"
              name="productName"
              required
              placeholder="Product Name:"
              value={productName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <textarea
              className="form-control mb-3"
              name="description"
              required
              placeholder="Description"
              value={description}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="attachment">Attachment:</label>
            <input
              className="form-control "
              type="file"
              name="image"
              required
              onChange={handleImageChange}
            ></input>
          </div>
          <div className="form-group">
            <button
              className="btn btn-block btn-success mt-3"
              disabled={isSending}
            >
              {isSending ? `Sending${dots}` : "Send Message"}
            </button>
          </div>
        </form>
        <br />
        {successMessage && (
          <div className="alert alert-success" role="alert">
            {successMessage}
          </div>
        )}
      </div>
    </>
  );
};

export default QuoteComponent;
