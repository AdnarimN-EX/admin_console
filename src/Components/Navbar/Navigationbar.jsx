import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useAuthContext } from '../../Hooks/useAuthContext';
import { useLogOut } from '../../Hooks/useLogOut';
import { Link, useNavigate } from 'react-router-dom';

function Navigationbar() {
  const { admin } = useAuthContext();
  const { logout } = useLogOut();
  const navigate = useNavigate();

  const handleClick = () => {
    logout();
    navigate('/');
  };

  return (
    <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>KASAW-APP ADMIN</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {admin && (
              <>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <NavDropdown
                  id="nav-dropdown-dark-example"
                  title={admin.username}
                  menuVariant="dark"
                >
                  <NavDropdown.Item as={Link} to="/accountSetting">
                    Account Settings
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/profileskilled">
                    Profile Settings
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={handleClick}>
                    Log-out
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigationbar;
