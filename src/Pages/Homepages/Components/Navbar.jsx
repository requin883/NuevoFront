import { useState } from "react";
import {
  Collapse,
  NavbarBrand,
  NavbarToggler,
  Navbar,
  Nav,
  NavLink,
  NavItem
} from "reactstrap";

function ExamplesNavbar({ onOpen, setFlag }) {

  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <>
      <Navbar fixed="top" className="nav" expand="lg" dark container>
        <NavbarBrand href="/" className="me-auto">
          CryptoCroders
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} />
        <Collapse isOpen={!collapsed} navbar>
          <Nav className="ms-auto" navbar>
            <NavItem>
              <NavLink onClick={setFlag.on} href="/register">
                Register
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={onOpen} href="/login">
                Login
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </>
  )
}

export default ExamplesNavbar;
