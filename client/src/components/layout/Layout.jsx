import React from 'react';
import Navbar from './Navbar';
import { Container, Alert } from 'react-bootstrap';

const Layout = ({ children, errorMessage }) =>
  <div>
    <header>
      <Navbar />
    </header>
    <Container>
      {errorMessage ?
        <Alert variant="danger">{errorMessage}</Alert>
        : null
      }
      <main>
        {children}
      </main>
    </Container>
    <footer className="mt-4 text-center">
      &copy; CDA Grenoble 2020
    </footer>
  </div>
;

export default Layout;
