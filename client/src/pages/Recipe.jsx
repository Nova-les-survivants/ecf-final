import React, { Component, Fragment } from 'react';
import makeRequest from '../services/makeRequest';
import { Spinner } from '../styles';
import { Jumbotron, Row, Col, Image, Badge } from 'react-bootstrap';
import { Layout } from '../components';

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
    const { recipe, errorMessage } = this.state;

    return (
      <Layout errorMessage={errorMessage}>
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
      </Layout>
    );
  }
}

export default RecipePage;
