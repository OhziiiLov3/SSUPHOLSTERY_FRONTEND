import React from "react";
import { useSelector, useDispatch } from "react-redux";
import logo from "../assets/PrimaryIcon.png";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-scroll";
import {logout} from '../actions/userActions'

const NavbarComponent = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logout())
    console.log("Logout");
  };

  return (
    <Navbar
      fixed="top"
      classname="navbar"
      variant="light"
      expand="lg"
      collaspeonselect="true"
    >
      <Container>
        <a className="navbar-brand" href="/">
          <img className="logo" src={logo} alt="logo..." />
        </a>
        <LinkContainer to="/">
          <Navbar.Brand>Swift Stitch Upholstery</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavDropdown
              className="nav-item dropdown"
              href="/services"
              title="Store"
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="/store">Store</NavDropdown.Item>
              <NavDropdown.Divider />

              <NavDropdown.Item className="dropdown" href="/volkswagen">
                Volkswagen
                <NavDropdown className="dropdown-menu submenu">
                  <NavDropdown.Item>
                    <a href="/" className="dropdown-item">
                      Mk1
                    </a>
                  </NavDropdown.Item>
                </NavDropdown>
              </NavDropdown.Item>

              <NavDropdown.Item href="#supplies">
                Upholstery Supplies + Tools
              </NavDropdown.Item>
              <NavDropdown.Item href="#seatcovers">
                Pre-Made Seat Covers
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/merchandise">
                Merchandise
              </NavDropdown.Item>
            </NavDropdown>
            <LinkContainer to="about">
              <Link
                className="nav-link"
                to="about"
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
              >
                About
              </Link>
            </LinkContainer>

            <LinkContainer to="/blog">
              <Link
                smooth={true}
                to="blog"
                offset={-100}
                className="nav-link"
                href="#"
              >
                Blog
              </Link>
            </LinkContainer>
            <LinkContainer to="/cart">
              <Nav.Link
                to="/cart"
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                className="nav-link"
              >
                <i className="fas fa-shopping-cart"></i>
                Cart
              </Nav.Link>
            </LinkContainer>

            {userInfo ? (
              <NavDropdown title={userInfo.name} id="username">
                <LinkContainer to="/profile">
                  <NavDropdown.Item>Profile </NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to="/login">
                <Nav.Link
                  to="/login"
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={500}
                  className="nav-link"
                >
                  <i className="fas fa-user"></i>
                  Login
                </Nav.Link>
              </LinkContainer>
            )}

            {userInfo && userInfo.isAdmin && (
              <NavDropdown title="Admin" id="adminmenu">
                <LinkContainer to="/admin/userlist">
                  <NavDropdown.Item>Users</NavDropdown.Item>
                </LinkContainer>

                <LinkContainer to="/admin/productlist">
                  <NavDropdown.Item>Products</NavDropdown.Item>
                </LinkContainer>
 
                <LinkContainer to="/admin/orderlist">
                  <NavDropdown.Item>Orders</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
