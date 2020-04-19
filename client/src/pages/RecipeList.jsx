import React, { Component } from 'react';
import { withCurrentUser } from '../redux/connectors';
import makeRequest from '../services/makeRequest';
import { Spinner } from '../styles';

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
    const { recipes, errorMessage } = this.state;

    if (recipes === null) {
      return <Spinner />;
    }

    return <div />;
  }
}

export default withCurrentUser(RecipeList);
