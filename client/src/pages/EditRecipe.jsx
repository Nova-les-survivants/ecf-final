import React, { Component } from 'react';
import { withCurrentUser } from '../redux/connectors';
import makeRequest from '../services/makeRequest';
import { Spinner } from '../styles';
import { Navbar, Nav, Container, Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCookieBite, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { FETCHING, FETCH_SUCCESSFUL } from '../redux/status';
import LogoutButton from '../components/LogoutButton';

class EditRecipePage extends Component
{
  state = {
    recipe: null,
    errorMessage: null,
    
    formData: {
      name: '',
      pictureUrl: '',
    }
  }

  componentDidMount = () => {
    const { id } = this.props.match.params;

    if (typeof id !== 'undefined') {
      makeRequest(`/recipes/${id}`)
      .then(
        response => this.setState({ recipe: response.data })
      )
      .catch(
        error => this.setState({ errorMessage: 'Erreur durant la récupération de la recette.' })
      )
    }
  }

  render = () => {
    const { id } = this.props.match.params;
    const { currentUser } = this.props;
    const { recipe, errorMessage } = this.state;

    if (typeof id !== 'undefined' && recipe === null) {
      return <Spinner />;
    }

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
            
          </main>
        </Container>
        <footer className="mt-4 text-center">
          &copy; CDA Grenoble 2020
        </footer>
      </div>
    );
  }
}

export default withCurrentUser(EditRecipePage);
