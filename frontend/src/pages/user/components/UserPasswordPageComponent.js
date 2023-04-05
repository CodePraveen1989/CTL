import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import { useState, useEffect } from "react";

const UserPasswordPageComponent = ({
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
  const [passwordsMatchState, setPasswordsMatchState] = useState(true);
  const [user, setUser] = useState({});
  const userInfo = userInfoFromRedux;

  useEffect(() => {
    fetchUser(userInfo._id)
      .then((data) => setUser(data))
      .catch((er) => console.log(er));
  }, [userInfo._id]);

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
    /* 这里有的，下面也必须有。而且form里面的name也要有对应的。不然就会报错。 */
    const password = form.password.value;


    if (
      event.currentTarget.checkValidity() === true &&
      form.password.value === form.confirmPassword.value
    ) {
      updateUserApiRequest(
        password,
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
          <h1>Change your password</h1>
          <br/>

          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                required
                type="password"
                placeholder="Password"
                minLength={6}
                onChange={onChange}
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
              <Form.Label>Repeat Password</Form.Label>
              <Form.Control
                name="confirmPassword"
                required
                type="password"
                placeholder="Repeat Password"
                minLength={6}
                onChange={onChange}
                isInvalid={!passwordsMatchState}
              />
              <Form.Control.Feedback type="invalid">
                Both passwords should match
              </Form.Control.Feedback>
            </Form.Group>
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

export default UserPasswordPageComponent;
