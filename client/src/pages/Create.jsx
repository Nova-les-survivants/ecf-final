import React, { Component } from 'react';
import { withCurrentUser } from '../redux/connectors';
import makeRequest, { HTTP_METHOD } from '../services/makeRequest';
import { Table, Button } from 'react-bootstrap';
import { Spinner } from '../styles';
import { Link } from 'react-router-dom';

class CreatePage extends Component
{
  state = {
    myRecipes: null,
  }

  componentDidMount = () => {
    const { currentUser } = this.props;

    makeRequest(`/users/${currentUser.id}/recipes`)
    .then(
      response => this.setState({ myRecipes: response.data })
    )
    .catch(
      // error => this.setState({ errorMessage: 'Erreur durant la récupération des recettes créées par l\'utilisateur.' })
      response => this.setState({ myRecipes: [
        {
          id: 15,
          name: 'Pouet',
          favorites: [0, 0, 0],
        },
        {
          id: 21,
          name: 'Truc',
          favorites: [0],
        },
        {
          id: 38,
          name: 'Bidule',
          favorites: [],
        },
      ] })
    )
  }

  deleteRecipe = (id) => () => {
    const { myRecipes } = this.state;

    makeRequest(`/recipes/${id}`, HTTP_METHOD.DELETE)
    .then(
      response => this.setState({ myRecipes: myRecipes.filter(item => item.id !== id) })
    )
    .catch(
      // error => this.setState({ errorMessage: 'Erreur durant la suppression de la recette.' })
      response => this.setState({ myRecipes: myRecipes.filter(item => item.id !== id) })
    )
  }

  render = () => {
    const { myRecipes } = this.state;

    if (myRecipes === null) {
      return <Spinner />;
    }

    return (
      <div>
      <h1 className="mt-4 mb-4">Mes recettes</h1>
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
      </div>
    );
  }
}

export default withCurrentUser(CreatePage);
