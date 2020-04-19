import React, { Fragment } from 'react';
import { withCurrentUser } from '../redux/connectors';
import { Navbar, Container, Nav, Jumbotron, Button } from 'react-bootstrap';
import { FETCH_SUCCESSFUL, FETCHING } from '../redux/status';
import { Spinner } from '../styles';
import LogoutButton from '../components/LogoutButton';
import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

const LoginPage = ({ currentUser }) => {
  const user = currentUser.data;

  return (
    <div>
      <header>
        <Navbar bg="light" expand="lg">
          <Link to="/">
            <Navbar.Brand href="#home">weCook.ie</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link to="/" className="nav-link">Accueil</Link>
            </Nav>
            <Navbar.Text>
              { currentUser.status === FETCHING ?
                <Spinner />
                :
                  currentUser.status === FETCH_SUCCESSFUL ?
                    <LogoutButton size="sm" />
                  :
                    <Link to="/login">
                      <Button size="sm">Connexion</Button>
                    </Link>
              }
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>        
      </header>
      <Container>
        <main>
          <LoginForm />
        </main>
      </Container>
      <footer className="mt-4 text-center">
        &copy; CDA Grenoble 2020
      </footer>
    </div>
  );
}

export default withCurrentUser(LoginPage);
