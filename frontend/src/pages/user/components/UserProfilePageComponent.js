import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  InputGroup,
} from "react-bootstrap";
import { useState, useEffect } from "react";

const UserProfilePageComponent = ({
  updateUserApiRequest,
  fetchUser,
  userInfoFromRedux,
  setReduxUserState,
  reduxDispatch,
  localStorage,
  sessionStorage,
}) => {
  const [validated, setValidated] = useState(false);
  const [updateUserResponseState, setUpdateUserResponseState] = useState({
    success: "",
    error: "",
  });
  const [user, setUser] = useState({});
  const userInfo = userInfoFromRedux;

  useEffect(() => {
    fetchUser(userInfo._id)
      .then((data) => setUser(data))
      .catch((er) => console.log(er));
  }, [userInfo._id]);


  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;
    /* 这里有的，下面也必须有。而且form里面的name也要有对应的。不然就会报错。 */
    const name = form.name.value;
    const lastName = form.lastName.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const mobile = form.mobile.value;
    const location = form.location.value;
    const company = form.company.value;
    const role = form.role.value;
    const city = form.city.value;
    const state = form.state.value;
    const postCode = form.postCode.value;

    if (
      event.currentTarget.checkValidity() === true
    ) {
      updateUserApiRequest(
        name,
        lastName,
        email,
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
          setUpdateUserResponseState({ success: data.success, error: "" });
          reduxDispatch(
            setReduxUserState({
              doNotLogout: userInfo.doNotLogout,
              ...data.userUpdated,
            })
          );
          if (userInfo.doNotLogout)
            localStorage.setItem(
              "userInfo",
              JSON.stringify({ doNotLogout: true, ...data.userUpdated })
            );
          else
            sessionStorage.setItem(
              "userInfo",
              JSON.stringify({ doNotLogout: false, ...data.userUpdated })
            );
        })
        .catch((er) =>
          setUpdateUserResponseState({
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
      <Row className="justify-content-md-center">
        <Col md={6} className="w-75">
          <h1>Change your profile</h1>

          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationCustom01">
                <Form.Label>Your name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  defaultValue={user.name}
                  name="name"
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a name
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="6" controlId="formBasicLastName">
                <Form.Label>Your last name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  defaultValue={user.lastName}
                  name="lastName"
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your last name
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  disabled
                  value={user.email}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="formBasicPhone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone number"
                  defaultValue={user.phone}
                />
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="formBasicMobile">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                  required
                  type="tel"
                  name="mobile"
                  placeholder="Enter your mobile number"
                  defaultValue={user.mobile}
                />
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="formBasicLocation">
                <Form.Label>Location</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="text"
                    name="location"
                    placeholder="Lcation"
                    defaultValue={user.location}
                  />
                </InputGroup>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="formBasicCompany">
                <Form.Label>Company</Form.Label>
                <Form.Control
                  type="text"
                  name="company"
                  disabled
                  value={user.company}
                />
              </Form.Group>

              <Form.Group as={Col} md="6" controlId="formBasicRole">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="role"
                  placeholder="Role"
                  defaultValue={user.role}
                />
              </Form.Group>
            </Row>

            <Row className="mb-4">
              <Form.Group as={Col} md="3" controlId="formBasicPostCode">
                <Form.Label>Postcode</Form.Label>
                <Form.Control
                  type="text"
                  name="postCode"
                  placeholder="Postcode"
                  defaultValue={user.postCode}
                />
              </Form.Group>

              <Form.Group as={Col} md="5" controlId="formBasicCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  placeholder="City"
                  defaultValue={user.city}
                />
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="formBasicState">
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  name="state"
                  placeholder="State"
                  defaultValue={user.state}
                />
              </Form.Group>
            </Row>

            <Row className="mt-1 ms-2 justify-content-md-left">
              <Button variant="primary" type="submit" className="w-auto">
                Update
              </Button>
              <Alert
                show={
                  updateUserResponseState &&
                  updateUserResponseState.error !== ""
                }
                variant="danger"
              >
                Something went wrong
              </Alert>
              <Alert
                show={
                  updateUserResponseState &&
                  updateUserResponseState.success === "user updated"
                }
                variant="info"
              >
                User updated
              </Alert>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfilePageComponent;
