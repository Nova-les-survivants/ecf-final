import React, { Component } from 'react';
import { withCurrentUser } from '../redux/connectors';
import makeRequest, { HTTP_METHOD } from '../services/makeRequest';
import { Table, Button, Navbar, Nav, Alert, Container } from 'react-bootstrap';
import { Spinner } from '../styles';
import { Link, Redirect } from 'react-router-dom';
import { faSignInAlt, faCookieBite } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LogoutButton from '../components/LogoutButton';
import { FETCHING, FETCH_SUCCESSFUL, NEED_FETCHING } from '../redux/status';

class CreatePage extends Component
{
  state = {
    myRecipes: null,
  }

  componentDidMount = () => {
    const { currentUser } = this.props;

    if (currentUser.status !== FETCH_SUCCESSFUL ) { return; }

    makeRequest(`/user/${currentUser.data.id}/recipes`)
    .then(
      response => this.setState({ myRecipes: response.data })
    )
    .catch(
      error => this.setState({ errorMessage: 'Erreur durant la récupération des recettes créées par l\'utilisateur.' })
    )
  }

  deleteRecipe = (id) => () => {
    const { myRecipes } = this.state;

    makeRequest(`/recipes/${id}`, HTTP_METHOD.DELETE)
    .then(
      response => this.setState({ myRecipes: myRecipes.filter(item => item.id !== id) })
    )
    .catch(
      error => this.setState({ errorMessage: 'Erreur durant la suppression de la recette.' })
    )
  }

  render = () => {
    const { currentUser } = this.props;
    const { myRecipes, errorMessage } = this.state;

    if (currentUser.status !== FETCH_SUCCESSFUL) {
      return <Redirect to='/' />;
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
            <h1 className="mt-4 mb-4">Mes recettes</h1>
            {myRecipes ?
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Votes</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {myRecipes.map( (recipe, index) =>
                    <tr key={index}>
                      <td>{recipe.name}</td>
                      <td>{recipe.favorites.length}</td>
                      <td>
                        <Link to={`/create/recipe/${recipe.id}`}>
                          <Button size="sm">Modifier</Button>
                        </Link>
                      </td>
                      <td><Button variant="danger" size="sm" onClick={this.deleteRecipe(recipe.id)}>Supprimer</Button></td>
                    </tr>
                  )}
                </tbody>
              </Table>
              :
              <Spinner />
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

export default withCurrentUser(CreatePage);
