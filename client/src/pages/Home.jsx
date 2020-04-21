import React, { Fragment, Component } from 'react';
import { withCurrentUser } from '../redux/connectors';
import { Jumbotron, Button, Carousel } from 'react-bootstrap';
import { FETCH_SUCCESSFUL, FETCHING } from '../redux/status';
import { Spinner } from '../styles';
import { Link } from 'react-router-dom';
import makeRequest from '../services/makeRequest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import { Layout } from '../components';

class HomePage extends Component
{
  state = {
    recentRecipes: null,
    errorMessage: null,
  }

  componentDidMount = () => {
    makeRequest('/recipes/recent')
    .then(
      response => this.setState({ recentRecipes: response.data })
    )
    .catch(
      error => this.setState({ errorMessage: 'Erreur durant la récupération des recettes récentes.' })
    )
  }

  render = () => {
    const { currentUser } = this.props;
    const { recentRecipes, errorMessage } = this.state;

    return (
      <Layout errorMessage={errorMessage}>
        <Jumbotron className="text-center">
          { currentUser.status === FETCHING ?
            <Spinner />
            :
              currentUser.status === FETCH_SUCCESSFUL ?
              <Fragment>
                <h1>
                  Bonjour {currentUser.data.email}!
                </h1>
                <p>
                  Texte amical pour les utilisateurs inscrits
                </p>
              </Fragment>
              :
              <Fragment>
                <h1>
                  Bienvenue!
                </h1>
                <p>
                  Texte amical pour inviter les visiteurs à s'inscrire
                </p>
                <Link to='/login'>
                  <Button>Se connecter</Button>
                </Link>
              </Fragment>
          }
        </Jumbotron>
        <h2>Nos dernières recettes</h2>
        {recentRecipes ?
          <Carousel>
            {recentRecipes.map( (recipe, index) =>
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={recipe.pictureUrl}
                  alt={`Illustration de la recette ${recipe.name}`}
                />
                <Carousel.Caption>
                  <h3>{recipe.name}</h3>
                  <Link to={`/recipe/${recipe.id}`}>
                    <Button>
                      Voir la recette <FontAwesomeIcon icon={faAngleDoubleRight} />
                    </Button>
                  </Link>
                </Carousel.Caption>
              </Carousel.Item>
            )}
          </Carousel>
          :
          <Spinner />
        }
      </Layout>
    );
  }
}

export default withCurrentUser(HomePage);
