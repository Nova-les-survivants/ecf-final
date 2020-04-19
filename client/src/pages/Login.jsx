import React from 'react';
import { withCurrentUser } from '../redux/connectors';
import { Navbar, Container, Nav, Button, } from 'react-bootstrap';
import { FETCH_SUCCESSFUL, FETCHING } from '../redux/status';
import { Spinner } from '../styles';
import LogoutButton from '../components/LogoutButton';
import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faCookieBite } from '@fortawesome/free-solid-svg-icons';

const LoginPage = ({ currentUser }) => {
  const user = currentUser.data;

  return (
    <div>
      <header>
        <Navbar bg="light" expand="lg">
          <Link to="/">
            <Navbar.Brand href="#home">
              <FontAwesomeIcon icon={faCookieBite} />
              {' '}weCook.ie
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link to="/" className="nav-link">Accueil</Link>
              <Link to="/recipe" className="nav-link">Toutes les recettes</Link>
            </Nav>
              { currentUser.status === FETCHING ?
                <Nav>
                  <Spinner />
                </Nav>
                :
                  currentUser.status === FETCH_SUCCESSFUL ?
                    <Nav>
                      <Link to="/create" className="nav-link">Mes recettes</Link>
                      <Navbar.Text>
                        <LogoutButton size="sm" />
                      </Navbar.Text>
                    </Nav>
                  :
                    <Link to="/login">
                      <Button size="sm">
                        <FontAwesomeIcon icon={faSignInAlt} />
                        {' '}Connexion
                      </Button>
                    </Link>
              }
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
