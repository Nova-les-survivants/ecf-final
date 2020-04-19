import React, { Component } from 'react';
import makeRequest from './services/makeRequest';
import { withCurrentUser } from './redux/connectors';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Test from './components/Test';
import LoginForm from './components/LoginForm';
import LogoutButton from './components/LogoutButton';
import { HomePage, LoginPage, CreatePage, EditRecipePage, RecipePage, RecipeListPage } from './pages';

class App extends Component
{
  componentDidMount = () => {
    this.fetchCurrentUser();
  }

  fetchCurrentUser = () => {
    const { fetchCurrentUserFailure, fetchCurrentUserRequest, fetchCurrentUserSuccess, resetCurrentUser } = this.props;

    fetchCurrentUserRequest();

    makeRequest('/user/current')
    .then(
      response => fetchCurrentUserSuccess(response.data)
    )
    .catch(
      error => {
        console.log(error);

        if (typeof error.response === 'undefined') {
          resetCurrentUser();
          window.alert('L\'API n\'est pas disponible! Lancez le serveur et rechargez la page!');
          return;
        }

        const status = error.response.status;

        switch (status) {
          case 401:
            resetCurrentUser();
            break;

          default:
            fetchCurrentUserFailure(error);
        }
      }
    )
  }

  render = () => (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/recipe" component={RecipeListPage} />
        <Route exact path="/recipe/:id(\d+)" component={RecipePage} />
        <Route exact path="/create" component={CreatePage} />
        <Route exact path="/create/recipe" component={EditRecipePage} />
        <Route exact path="/create/recipe/:id(\d+)" component={EditRecipePage} />
      </Switch>
    </BrowserRouter>
  );
}

export default withCurrentUser(App);
