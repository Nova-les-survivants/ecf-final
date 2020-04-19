import React, { Component } from 'react';
import { withCurrentUser } from '../redux/connectors';
import makeRequest from '../services/makeRequest';
import { Spinner } from '../styles';

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
    const { recipe } = this.state;

    if (recipe === null) {
      return <Spinner />;
    }

    return <div />;
  }
}

export default withCurrentUser(RecipePage);
