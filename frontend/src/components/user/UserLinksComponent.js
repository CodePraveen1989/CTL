import { Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../../redux/actions/userActions";
import { useDispatch } from "react-redux";

const UserLinksComponent = () => {
  const dispatch = useDispatch()

  return (
    <Navbar bg="light" variant="light">
      {/* bootstrap里Navs -> vertical 扒一个vertical的navbar */}
      <Nav className="flex-column">
        <LinkContainer to="/user/my-orders">
          <Nav.Link>Orders</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/user">
          <Nav.Link>My Profile</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/user/password">
          <Nav.Link>Change Password</Nav.Link>
        </LinkContainer>
        
        <Nav.Link onClick={() => dispatch(logout())}>Logout</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default UserLinksComponent;

