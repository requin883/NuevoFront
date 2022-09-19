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

function ExamplesNavbar(props, children) {

  const links = props?.val || 0;

  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <>
      <Navbar fixed="top" className="nav" expand="lg" dark container>
        <NavbarBrand href="/" className="me-auto">
          <img src="../../../../Public/assets/logo.png" className="img-fluid navbarimg" alt="..." />
        </NavbarBrand>
        {links?<><NavbarToggler onClick={toggleNavbar} />
        <Collapse isOpen={!collapsed} navbar>
        <Nav className="ms-auto" navbar>
          {links.map(link=>{
        return(
          <>
              <NavItem key={link}>
                <NavLink href={`/${link}`}>
                  {link}
                </NavLink>
              </NavItem>
              </>)})}
        </Nav>
        </Collapse>
        </>:""}
      </Navbar>
    </>
  )
}

export default ExamplesNavbar;
