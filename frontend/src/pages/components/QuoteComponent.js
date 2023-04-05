import React, { useState } from "react";
// import { Row, Col, Button, Form } from "react-bootstrap";

const QuoteComponent = () => {
/*   const [mailerState, setMailerState] = useState({
    name: "",
    email: "",
    message: "",
  });

  function handleStateChange(e) {
    setMailerState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  const submitEmail = async (e) => {
    e.preventDefault();
    console.log({ mailerState });

    // mailerState.append('myfile');

    const response = await fetch("http://localhost:5000/send", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ mailerState }),
    })
      .then((res) => res.json())
      .then(async (res) => {
        const resData = await res;
        console.log(resData);
        if (resData.status === "success") {
          alert("Message Sent");
        } else if (resData.status === "fail") {
          alert("Message failed to send");
        }
      })
      .then(() => {
        setMailerState({
          email: "",
          name: "",
          message: "",
        });
      });
  }; */

  /*   async function handleSubmit(event) {
    event.preventDefault();
  
    let fd = new FormData();
    fd.append('myfile');
  
    fetch('http://localhost:5000/send', {
      method: 'POST', body: fd
    }).catch(err => {
      console.error(err);
    });
  } */

  return (
    <>
      {/* <p>
        No product found, please try another keywords, or fill the form, we can
        find out for you.
      </p>
      <div className="App w-50">
        <form
          style={{
            display: "flex",
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
          }}
          enctype="multipart/form-data"
          onSubmit={submitEmail}
        >
          <fieldset
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "50%",
            }}
          >
            <legend>React NodeMailer Contact Form</legend>
            <input
              placeholder="Name"
              onChange={handleStateChange}
              name="name"
              value={mailerState.name}
            />
            <input
              placeholder="Email"
              onChange={handleStateChange}
              name="email"
              value={mailerState.email}
            />
            <textarea
              style={{ minHeight: "200px" }}
              placeholder="Message"
              onChange={handleStateChange}
              name="message"
              value={mailerState.message}
            />
            <input type="file" onChange={handleStateChange} name="myfile" />
            <button>Send Message</button>
          </fieldset>
        </form>
      </div> */}
      {/* <Form className="w-50 ms-5">
      <h1>Din't find what you want?</h1>
      <h5>Please fill the form, we will find it for you.</h5>
      <br/>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="formBasicEmail">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            className="mb-3 "
            type="text"
            name="productName"
            placeholder="Product Name"
            aria-describedby="inputGroupPrepend"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please enter a product.{" "}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="6" controlId="formBasicFile">
          <Form.Label>Product Image</Form.Label>
          <Form.Control
            className="mb-3 "
            type="file" 
            name="my_file"
            placeholder="Product Name"
            aria-describedby="inputGroupPrepend"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please enter a product.{" "}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            as="textarea"
            name="description"
            placeholder="Product Description"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please enter PO.{" "}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" as={Col} md="6" controlId="formBasicName">
          <Form.Label>Your Name</Form.Label>
          <Form.Control
            type="text"
            name="user"
            placeholder="Full Name"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" as={Col} md="6" controlId="formBasicMobile">
          <Form.Label>Your Mobile</Form.Label>
          <Form.Control
            type="text"
            name="mobile"
            placeholder="Your Mobile"
            required
          />
        </Form.Group>
      </Row>

        <Button type="submit" variant="outline-primary">
          SEND
        </Button>
    </Form> */}

      <div className="container w-50">
        <br />
        <h1 className="text-center">NodeMailer Email Sending App</h1>
        <br />
        <form
          autocomplete="off"
          action="/sendemail"
          method="POST"
          enctype="multipart/form-data"
        >
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              name="from"
              required
              placeholder="From:"
              id=""
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              name="productName"
              required
              placeholder="Product Name:"
              id=""
            />
          </div>
          <div className="form-group">
            <textarea
              className="form-control"
              name="description"
              required
              placeholder="Description"
              id=""
            />
          </div>
          <div className="form-group">
            <label for="attachment">Attachment:</label>
            <input
              className="form-control"
              type="file"
              name="image"
              required
              id=""
            ></input>
          </div>
          <div className="form-group">
            <button className="btn btn-block btn-success mt-2">Send Message</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default QuoteComponent;
