import React from 'react';
import { Navbar as BootstrapNavbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCookieBite } from '@fortawesome/free-solid-svg-icons';
import CurrentUserNav from './CurrentUserNav';

const Navbar = () =>
  <BootstrapNavbar bg="light" expand="lg">
    <Link to="/">
      <BootstrapNavbar.Brand href="#home">
        <FontAwesomeIcon icon={faCookieBite} />
        {' '}weCook.ie
      </BootstrapNavbar.Brand>
    </Link>
    <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
    <BootstrapNavbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Link to="/" className="nav-link">Accueil</Link>
        <Link to="/recipe" className="nav-link">Toutes les recettes</Link>
      </Nav>
      <CurrentUserNav />
    </BootstrapNavbar.Collapse>
  </BootstrapNavbar>
;

export default Navbar;
