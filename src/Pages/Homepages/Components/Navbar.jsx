import { useState } from "react";
import {
  Collapse,
  NavbarBrand,
  NavbarToggler,
  Navbar,
  Nav,
  NavLink,
  NavItem,
  Container
} from "reactstrap";

function ExamplesNavbar(props) {

  const links = props?.val || null;

  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <>
      <Navbar fixed="top" className="nav" expand="lg" dark container>
        <NavbarBrand href="/home/" className="me-auto">
          <img src="../../../../Public/assets/Logo.png" className="img-fluid navbarimg" alt="..." />
        </NavbarBrand>
        {links ? <><NavbarToggler onClick={toggleNavbar} />
          <Collapse isOpen={!collapsed} navbar>
            <Nav className="ms-auto" navbar>
              {links.map(link => {
                return (
                  <>
                    <NavItem key={link}>
                      <NavLink href={`/${link}`}>
                        {link}
                      </NavLink>
                    </NavItem>
                  </>)
              })}
            </Nav>
          </Collapse>
        </> : props.children ? <Container className="ms-auto">{props.children}</Container> : ""}
      </Navbar>
    </>
  )
}

export default ExamplesNavbar;
