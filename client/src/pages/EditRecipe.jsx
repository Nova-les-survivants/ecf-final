import React, { Component } from 'react';
import { withCurrentUser } from '../redux/connectors';
import makeRequest from '../services/makeRequest';
import { Spinner } from '../styles';

class EditRecipePage extends Component
{
  state = {
    recipe: null,
    errorMessage: null,
    
    formData: {
      name: '',
      picture: '',
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
    const { recipe } = this.state;

    if (typeof id !== 'undefined' && recipe === null) {
      return <Spinner />;
    }

    return <div />;
  }
}

export default withCurrentUser(EditRecipePage);
