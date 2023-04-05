import UserProfilePageComponent from "./components/UserProfilePageComponent";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setReduxUserState } from "../../redux/actions/userActions";
import UserLinksComponent from "../../components/user/UserLinksComponent";
import {
  Row,
  Col, 
} from "react-bootstrap";

const updateUserApiRequest = async (
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
) => {
  const { data } = await axios.put("/api/users/profile", {
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
    postCode,
  });
  return data;
};

const fetchUser = async (id) => {
  const { data } = await axios.get("/api/users/profile/" + id);
  return data;
};

const UserProfilePage = () => {
  const reduxDispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userRegisterLogin);

  return (
    <Row className="m-5">
      <Col md={2}>
        <UserLinksComponent />
      </Col>
      <Col md={10}>
        <UserProfilePageComponent
          updateUserApiRequest={updateUserApiRequest}
          fetchUser={fetchUser}
          userInfoFromRedux={userInfo}
          setReduxUserState={setReduxUserState}
          reduxDispatch={reduxDispatch}
          localStorage={window.localStorage}
          sessionStorage={window.sessionStorage}
        />
      </Col>
    </Row>
  );
};

export default UserProfilePage;
