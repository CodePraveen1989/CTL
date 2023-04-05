import React, { useState } from "react";
import {
  Alert,
  Container,
  Button,
  Col,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

const RegisterPageComponent = ({
  registerUserApiRequest,
  reduxDispatch,
  setReduxUserState,
}) => {
  //去react bootstrap里面找，form => validation 抄一个
  const [validated, setValidated] = useState(false);
  const [registerUserResponseState, setRegisterUserResponseState] = useState({
    /* 这个是spinner，如果是loading：false了，那就不显示spinner */
    success: "",
    error: "",
    loading: false,
  });

  const [passwordsMatchState, setPasswordsMatchState] = useState(true);

  //const一个function去检测，确认密码是否匹配原始密码
  const onChange = () => {
    const password = document.querySelector("input[name=password]");
    const confirmPassword = document.querySelector(
      "input[name=confirmPassword]"
    );
    if (confirmPassword.value === password.value) {
      setPasswordsMatchState(true);
    } else {
      setPasswordsMatchState(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;
    const email = form.email.value;
    const name = form.name.value;
    const lastName = form.lastName.value;
    const password = form.password.value;
    const phone = form.phone.value;
    const mobile = form.mobile.value;
    const location = form.location.value;
    const company = form.company.value.toUpperCase();
    const role = form.role.value;
    const city = form.city.value;
    const state = form.state.value;
    const postCode = form.postCode.value;
    //todo email validation to not display alert if they register with slrltd

    const pattern =
      /^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(slrltd)\.com$/g;
    if (!pattern.test(email) && email !== "")
      /* {
            alert(`Thank you for your application to register your interest in our company. 
       We have received a large number of applications, however due to delivering exceptional service to our current clients, delivering a continuation of supply on all of our product lines and maintaining a competitive pricing structure we are unable to bring on any new clients at this stage.
       This is not to say that in the future we would not be interested in securing your business. We will keep your information on hand and contact you at a time that we feel best suited to deliver you and your business the same service as detailed above.
       `); 
        } */ window.location.href = "/unfortunately";
    /* else {
      alert(`Successfully registered with CTL Australia`);
    } */

    /* 下面是一些form里面的判定 validation的判定 */
    if (
      event.currentTarget.checkValidity() === true &&
      email &&
      password &&
      name &&
      lastName &&
      phone &&
      mobile &&
      location &&
      company &&
      role &&
      city &&
      state &&
      postCode &&
      form.password.value === form.confirmPassword.value
    ) {
      /* 点击submit了之后，判定validity，如果form里面的东西都是true了，那loading true。后面会用这个state操作spinner */
      setRegisterUserResponseState({ loading: true });
      registerUserApiRequest(
        name,
        lastName,
        email,
        password,
        phone,
        mobile,
        location,
        company,
        role,
        city,
        state,
        postCode
      )
        .then((data) => {
          /* 如果data success了，那就set spinner false */
          setRegisterUserResponseState({
            success: data.success,
            loading: false,
          });
          reduxDispatch(setReduxUserState(data.userCreated));
        })
        // incase some error写一个catch error的function
        .catch((er) =>
          setRegisterUserResponseState({
            error: er.response.data.message
              ? er.response.data.message
              : er.response.data,
          })
        );
    }

    setValidated(true);
  };

  return (
    <Container>
      <Row className="mt-5 justify-content-md-center">
        <Col md={6} className="w-100">
          {/* <h2>Register</h2> */}

          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Control
                  required
                  type="text"
                  name="name"
                  placeholder="First name"
                />
                <Form.Control.Feedback type="invalid">
                  Please choose first name.{" "}
                </Form.Control.Feedback>
                {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="formBasicLastName">
                <Form.Control
                  required
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                />
                <Form.Control.Feedback type="invalid">
                  Please choose last name.{" "}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="formBasicEmail">
                <InputGroup hasValidation>
                  {/* <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text> */}
                  <Form.Control
                    type="text"
                    name="email"
                    placeholder="Email"
                    aria-describedby="inputGroupPrepend"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please choose an email.{" "}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="formBasicPhone">
                <Form.Control
                  required
                  type="tel"
                  name="phone"
                  pattern="[0-9]*"
                  placeholder="Phone Number"
                />
                <Form.Control.Feedback type="invalid">
                  Please choose phone number.{" "}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="formBasicMobile">
                <Form.Control
                  required
                  type="tel"
                  name="mobile"
                  pattern="[0-9]*"
                  placeholder="Mobile Number"
                />
                <Form.Control.Feedback type="invalid">
                  Please choose mobile number.{" "}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="formBasicRole">
                <Form.Control
                  required
                  type="text"
                  name="role"
                  placeholder="Role"
                />
                <Form.Control.Feedback type="invalid">
                  Please mention your role.{" "}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="formBasicCompany">
                <InputGroup hasValidation>
                  <Form.Control
                    type="text"
                    name="company"
                    placeholder="Your Company"
                    aria-describedby="inputGroupPrepend"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please choose site location.{" "}
                  </Form.Control.Feedback>
                </InputGroup>
                {/* <Form.Select id="Select" type="text" name="company">
                                    <option value="selected">Please select your company</option>
                                    <option value="SLR">Sliver Lake Resources (SLR)</option>
                                    <option value="CTLLLLL">CTLLLLL</option>
                                    <option>Company Name3</option>
                                    <option>Company Name4</option>
                                </Form.Select> */}
                <Form.Control.Feedback type="invalid">
                  Please mention company name.{" "}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="6" controlId="formBasicLocation">
                <InputGroup hasValidation>
                  <Form.Control
                    type="text"
                    name="location"
                    placeholder="Site"
                    aria-describedby="inputGroupPrepend"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please choose site location.{" "}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="formBasicPostCode">
                <Form.Control
                  type="text"
                  name="postCode"
                  placeholder="Postcode"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {" "}
                  Please provide a valid postcode.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="formBasicCity">
                <Form.Control
                  type="text"
                  name="city"
                  placeholder="Suburb"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid city.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="formBasicState">
                <Form.Control
                  type="text"
                  name="state"
                  placeholder="State"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {" "}
                  Please provide a valid state.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                name="password"
                required
                type="password"
                placeholder="Password"
                minLength={6}
                onChange={onChange}
                /* 判断一下两个passwords是不是全等，不是的话，就是isInvalid 是 false。 */
                isInvalid={!passwordsMatchState}
              />
              <Form.Control.Feedback type="invalid">
                Please anter a valid password
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                Password should have at least 6 characters
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPasswordRepeat">
              <Form.Control
                name="confirmPassword"
                required
                type="password"
                placeholder="Repeat Password"
                minLength={6}
                onChange={onChange}
              />
              <Form.Control.Feedback type="invalid">
                Both passwords should match
              </Form.Control.Feedback>
            </Form.Group>
            <Row></Row>

            {/* <Form.Group className="mb-3">
              <Form.Check
                required
                label="Agree to terms and conditions"
                name="tc"
                feedback="You must agree before submitting."
                feedbackType="invalid"
              />
            </Form.Group>

            <Row className="pb-2">
              <Col>
                {" "}
                Do you have an account already?
                <Link to={"/login"}> Login </Link>
              </Col>
            </Row> */}

            <br />
            <Button type="submit">
              {registerUserResponseState &&
              registerUserResponseState.loading === true ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                ""
              )}
              Submit
            </Button>
            {/* 在user controller里面handle了user exists 以及 user created */}
            <Alert
              show={
                registerUserResponseState &&
                registerUserResponseState.error === "user exists"
              }
              variant="danger"
            >
              User with that email already exists!
            </Alert>
            <Alert
              show={
                registerUserResponseState &&
                registerUserResponseState.success === "User created"
              }
              variant="info"
            >
              User created
            </Alert>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPageComponent;
