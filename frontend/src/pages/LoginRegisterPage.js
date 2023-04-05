import LoginPageComponent from "./components/LoginPageComponent";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setReduxUserState } from "../redux/actions/userActions";
import RegisterPageComponent from "./components/RegisterPageComponent";
import { Container, Card, Tabs, Tab } from "react-bootstrap";


//这是个login的东西，但是同时用在register里面，如果register了，就直接login了

const loginUserApiRequest = async (email, password, doNotLogout) => {
    const { data } = await axios.post("/api/users/login", {
        email,
        password,
        doNotLogout,
    });
    if (data.userLoggedIn.doNotLogout)
        localStorage.setItem("userInfo", JSON.stringify(data.userLoggedIn));
    else sessionStorage.setItem("userInfo", JSON.stringify(data.userLoggedIn));
    return data;
};

const registerUserApiRequest = async (
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
) => {
    const { data } = await axios.post("/api/users/register", {
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
        postCode,
    });
    /* 传信息去redux ？？？？*/
    sessionStorage.setItem("userInfo", JSON.stringify(data.userCreated));
    /* 如果注册成功了，就转去user page */
    // if (data.success === "User created") window.location.href = "/user";
    return data;
};

const LoginRegisterPage = () => {
    const reduxDispatch = useDispatch();

    return (
        <>


            <Container className='LoginRegPage' >
                <Card className='LoginReg' >

                    <Card.Body>
                        <Tabs
                            defaultActiveKey="LoginForm"
                            id="uncontrolled-tab-example"
                            className="mb-4"

                        >
                            {/* ************   Login Tab  ***************  */}
                            <Tab eventKey="LoginForm" title="Login">
                                <LoginPageComponent
                                    loginUserApiRequest={loginUserApiRequest}
                                    reduxDispatch={reduxDispatch}
                                    setReduxUserState={setReduxUserState}
                                />
                                <br />
                            </Tab>

                            {/* ************   Register tab  ***************  */}
                            <Tab eventKey="RegisterForm" title="Register">
                                <RegisterPageComponent
                                    registerUserApiRequest={registerUserApiRequest}
                                    reduxDispatch={reduxDispatch}
                                    setReduxUserState={setReduxUserState}
                                />
                            </Tab>
                        </Tabs>
                    </Card.Body>
                </Card>


                {/* ************   Sider box Need a CTL distributor Account?  ***************  */}

            </Container>








        </>
    );
};

export default LoginRegisterPage;
