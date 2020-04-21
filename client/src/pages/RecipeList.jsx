import React, { Component } from 'react';
import makeRequest from '../services/makeRequest';
import { Spinner } from '../styles';
import { Card, Row, Col, Image, Badge, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Layout } from '../components';

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

    return (
      <Layout errorMessage={errorMessage}>
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
      </Layout>
    );
  }
}

export default RecipeList;
