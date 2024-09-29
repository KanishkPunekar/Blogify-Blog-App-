import { useEffect, useState } from 'react';
import { NavLink as ReactLink, useNavigate } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { doLogout, getCurrentUser, isLoggedIn } from '../auth';
import { useContext } from 'react';
import userContext from '../context/userContext';

const CustomNavbar = () => {
  const userContextData = useContext(userContext);
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const userData = await getCurrentUser(); // Fetch the user data
        if (userData) {
          console.log("User data fetched:", userData); // Debugging line
          setLogin(true);
          setUser(userData); // Assuming userData contains the user object
        } else {
          setLogin(false);
          setUser(null);
        }
      } catch (e) {
        console.error("Error fetching user data:", e);
        setLogin(false);
        setUser(null);
      }
    };

    checkLogin();
  }, [userContextData]);

  const logout = () => {
    doLogout(() => {
      localStorage.removeItem('user'); // Remove user data from local storage
      setLogin(false);
      userContextData.setUser({
        data: null,
        login: false
      });
      navigate("/"); // Redirect to home after logout
    });
  }

  return (
    <div>
      <Navbar color="dark" dark expand="md" className="px-5">
        <NavbarBrand tag={ReactLink} to="/home">
          Blogify
        </NavbarBrand>
        <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink tag={ReactLink} to="/">
                New Feed
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/about">
                About
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/services">
                Services
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                More
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem tag={ReactLink} to="/services">
                  Services
                </DropdownItem>
                <DropdownItem>Contact us</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Mail</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <Nav navbar>
            {login ? (
              <>
                <NavItem>
                  <NavLink
                    tag={ReactLink}
                    to={`/user/profile-info/${user.user_id}`} // Access user_id directly
                  >
                    Profile Info
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink color='black' tag={ReactLink} to="/user/dashboard">
                    {user.email} {/* Directly access email from user object */}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink onClick={logout}>Logout</NavLink>
                </NavItem>
              </>
            ) : (
              <>
                <NavItem>
                  <NavLink  tag={ReactLink} to="/login">
                    Login
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={ReactLink} to="/signup">
                    Signup
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default CustomNavbar;
