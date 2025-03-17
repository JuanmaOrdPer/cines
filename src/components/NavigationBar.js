// components/NavBar.js
import React, { useContext } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CineEuropaContext } from '../context/CineEuropaContext';

const NavBar = () => {
  const { salas } = useContext(CineEuropaContext);

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Cines Europa</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <NavDropdown title="Salas" id="basic-nav-dropdown">
              {salas.map(sala => (
                <NavDropdown.Item 
                  key={sala.id} 
                  as={Link} 
                  to={`/sala/${sala.id}`}
                >
                  {sala.nombre}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;