import React, { Fragment, Component } from 'react';
import { withCurrentUser } from '../redux/connectors';
import { Navbar, Container, Nav, Jumbotron, Button, Alert } from 'react-bootstrap';
import { FETCH_SUCCESSFUL, FETCHING } from '../redux/status';
import { Spinner } from '../styles';
import LogoutButton from '../components/LogoutButton';
import { Link } from 'react-router-dom';
import makeRequest from '../services/makeRequest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCookieBite, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

class HomePage extends Component
{
  state = {
    recentRecipes: null,
    errorMessage: null,
  }

  componentDidMount = () => {
    makeRequest('/recipes/recent')
    .then(
      response => this.setState({ recentRecipes: response.data })
    )
    .catch(
      error => this.setState({ errorMessage: 'Erreur durant la récupération des recettes récentes.' })
    )
  }

  render = () => {
    const { currentUser } = this.props;
    const { recentRecipes, errorMessage } = this.state;

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
          {errorMessage ?
            <Alert variant="danger">{errorMessage}</Alert>
            : null
          }
          <main>
            <Jumbotron className="text-center">
              { currentUser.status === FETCHING ?
                <Spinner />
                :
                  currentUser.status === FETCH_SUCCESSFUL ?
                  <Fragment>
                    <h1>
                      Bonjour {currentUser.data.email}!
                    </h1>
                    <p>
                      Texte amical pour les utilisateurs inscrits
                    </p>
                  </Fragment>
                  :
                  <Fragment>
                    <h1>
                      Bienvenue!
                    </h1>
                    <p>
                      Texte amical pour inviter les visiteurs à s'inscrire
                    </p>
                    <Link to='/login'>
                      <Button>Se connecter</Button>
                    </Link>
                  </Fragment>
              }
            </Jumbotron>
            <section>
              <h2>
                Dernières recettes publiées
              </h2>
              <div>
                TO-DO
              </div>
            </section>
          </main>
        </Container>
        <footer className="mt-4 text-center">
          &copy; CDA Grenoble 2020
        </footer>
      </div>
    );
  }
}

export default withCurrentUser(HomePage);
