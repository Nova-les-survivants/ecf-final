import React, { Component } from 'react';
import { withCurrentUser } from '../redux/connectors';
import makeRequest, { HTTP_METHOD } from '../services/makeRequest';
import { Table, Button } from 'react-bootstrap';
import { Spinner } from '../styles';
import { Link, Redirect } from 'react-router-dom';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FETCH_SUCCESSFUL } from '../redux/status';
import Layout from '../components/layout';

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
      <Layout errorMessage={errorMessage}>
        <h1 className="mt-4 mb-4">Mes recettes</h1>
          <Link to={`/create/recipe`}>
            <Button variant="success">Nouvelle recette <FontAwesomeIcon icon={faPlus} /></Button>
          </Link>
          {myRecipes ?
            <Table striped bordered hover className="mt-4">
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
                    <td>
                      <Link to={`/recipe/${recipe.id}`}>
                        {recipe.name}
                      </Link>
                    </td>
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
      </Layout>
    );
  }
}

export default withCurrentUser(CreatePage);
