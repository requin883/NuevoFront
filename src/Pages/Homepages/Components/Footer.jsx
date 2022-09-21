/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

// core components

function Footer() {
  return (
    <>
      <footer className="footer footer-default">
        <Container className="text-center p-5">
          <div className="copyright" id="copyright">
            © {new Date().getFullYear()}, Designed & Coded by{" "}
            <a
              href="#"
              target="_blank"
            >
              CryptoCoders
            </a>
          </div>
        </Container>
      </footer>
    </>
  );
}

export default Footer;
