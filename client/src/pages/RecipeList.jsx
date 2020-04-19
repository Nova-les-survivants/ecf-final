import React, { Component } from 'react';
import { withCurrentUser } from '../redux/connectors';
import makeRequest from '../services/makeRequest';
import { Spinner } from '../styles';
import { Card, Row, Col, Image, Badge, Button, Navbar, Nav, Container, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight, faCookieBite, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { FETCHING, FETCH_SUCCESSFUL } from '../redux/status';
import LogoutButton from '../components/LogoutButton';

class RecipeList extends Component
{
  state = {
    recipes: null,
    errorMessage: null,
  }

  componentDidMount = () => {
    makeRequest('/recipes')
    .then(
      response => this.setState({ recipes: response.data })
    )
    .catch(
      error => this.setState({ errorMessage: 'Erreur durant la récupération des recettes.' })
    )
  }

  render = () => {
    const { currentUser } = this.props;
    const { recipes, errorMessage } = this.state;

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
            {recipes === null ?
              <Spinner />
              :
              <ul>
                {recipes.map( (recipe, index) =>
                  <li key={index} style={{ listStyle: 'none' }} className="mt-2">
                    <Card>
                      <Row>
                        <Col sm={3}>
                          <Image src={recipe.pictureUrl} fluid />
                        </Col>
                        <Col sm>
                          <Card.Body>
                            <Card.Title>
                              {recipe.name}
                            </Card.Title>
                            <Card.Text className="text-muted">
                              Recette publiée par <a href={`mailto:${recipe.user.username}`}>
                                {recipe.user.username}
                              </a>
                            </Card.Text>
                            <Card.Text>
                              {recipe.tags.map( (tag, index) =>
                                <Badge variant="info" key={index} className="mr-2">{tag.name}</Badge>
                              )}
                            </Card.Text>
                            <Link to={`/recipe/${recipe.id}`}>
                              <Button>
                                Voir la recette <FontAwesomeIcon icon={faAngleDoubleRight} />
                              </Button>
                            </Link>
                          </Card.Body>
                        </Col>
                      </Row>
                    </Card>
                  </li>
                )}
              </ul>
            }
          </main>
        </Container>
        <footer className="mt-4 text-center">
          &copy; CDA Grenoble 2020
        </footer>
      </div>
    );
  }
}

export default withCurrentUser(RecipeList);
