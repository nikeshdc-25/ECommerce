import { Navbar, Container, Nav, Badge } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../assets/react.svg";

function Header() {
  const { cartItems } = useSelector((state) => state.cart);
  console.log(cartItems);
  return (
    <header>
      <Navbar variant="dark" bg="dark" expand="md" collapseOnSelect>
        <Container>
          <NavLink to="/" className="navbar-brand">
            <img src={logo} alt="logo" /> Broadway
          </NavLink>
          <Navbar.Toggle aria-controls="navbar" />

          <Navbar.Collapse id="navbar">
            <Nav className="ms-auto">
              <NavLink to="/cart" className="nav-link">
                <FaShoppingCart /> Cart{" "}
                {cartItems.length > 0 && (
                  <Badge bg="success" pill>
                    {cartItems.length}
                  </Badge>
                )}
              </NavLink>
              <NavLink to="/signin" className="nav-link">
                <FaUser /> Signin
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
