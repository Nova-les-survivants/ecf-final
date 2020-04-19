import React, { Component, Fragment } from 'react';
import { withCurrentUser } from '../redux/connectors';
import makeRequest from '../services/makeRequest';
import { Spinner } from '../styles';
import { Jumbotron, Row, Col, Image, Badge, Button, Navbar, Nav, Container, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCookieBite, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { FETCHING, FETCH_SUCCESSFUL } from '../redux/status';
import LogoutButton from '../components/LogoutButton';

class RecipePage extends Component
{
  state = {
    recipe: null,
    errorMessage: null,
  }

  componentDidMount = () => {
    const { id } = this.props.match.params;

    makeRequest(`/recipes/${id}`)
    .then(
      response => this.setState({ recipe: response.data })
    )
    .catch(
      error => this.setState({ errorMessage: 'Erreur durant la récupération de la recette.' })
    )
  }

  render = () => {
    const { currentUser } = this.props;
    const { recipe, errorMessage } = this.state;

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
            {recipe === null ?
              <Spinner />
              :
              <Fragment>
                <Jumbotron>
                  <Row>
                    <Col sm={3}>
                      <Image src={recipe.pictureUrl} fluid />
                    </Col>
                    <Col sm>
                      <h1>{recipe.name}</h1>
                      <p className="text-muted">
                        Recette publiée par <a href={`mailto:${recipe.user.username}`}>
                          {recipe.user.username}
                        </a>
                      </p>
                      <div>
                        {recipe.tags.map( (tag, index) =>
                          <Badge variant="info" key={index} className="mr-2">{tag.name}</Badge>
                        )}
                      </div>
                    </Col>
                  </Row>
                </Jumbotron>
                <section>
                  <h2>Ingrédients</h2>
                  <ul>
                    {recipe.recipeIngredients.map( (recipeIngredient, index) =>
                      <li key={index}>
                        {recipeIngredient.ingredient.name}: {recipeIngredient.measure}
                      </li>
                    )}
                  </ul>
                </section>
                <section>
                  <h2>Instructions</h2>
                  <p>
                    {recipe.instructions}
                  </p>
                </section>
              </Fragment>
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

export default withCurrentUser(RecipePage);
