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
    const { fetchCurrentUserFailure, fetchCurrentUserRequest, fetchCurrentUserSuccess } = this.props;

    fetchCurrentUserRequest();

    makeRequest('/user/current')
    .then(
      response => fetchCurrentUserSuccess(response.data)
    )
    .catch(
      error => fetchCurrentUserFailure(error)
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
