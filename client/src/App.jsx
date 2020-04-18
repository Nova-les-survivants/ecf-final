import React, { Component } from 'react';
import makeRequest from './services/makeRequest';
import Test from './components/Test';
import { withCurrentUser } from './redux/connectors';
import LoginForm from './components/LoginForm';
import LogoutButton from './components/LogoutButton';

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
    <div>
      <LoginForm />
      <LogoutButton />
      <Test test="This is a test prop" />
    </div>
  );
}

export default withCurrentUser(App);
