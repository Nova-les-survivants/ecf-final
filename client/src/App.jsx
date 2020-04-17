import React, { Component } from 'react';
import makeRequest, { HTTP_METHOD } from './services/makeRequest';
import store from './redux/store';
import { fetchCurrentUserRequest, fetchCurrentUserSuccess, fetchCurrentUserFailure } from './redux/actions';
import Test from './components/Test';

export default class App extends Component
{
  componentDidMount = () => {
    this.fetchCurrentUser();
  }

  fetchCurrentUser = () => {
    store.dispatch(fetchCurrentUserRequest());

    makeRequest('user/current')
    .then(
      response => store.dispatch(fetchCurrentUserSuccess(response.data))
    )
    .catch(
      error => store.dispatch(fetchCurrentUserFailure(error))
    )
  }

  login = () => {
    store.dispatch(fetchCurrentUserRequest());

    makeRequest('login', HTTP_METHOD.POST, { username: 'admin@test.com', password: 'admin' })
    .then(
      response => store.dispatch(fetchCurrentUserSuccess(response.data))
    )
    .catch(
      error => store.dispatch(fetchCurrentUserFailure(error))
    )
  }

  render = () => <Test />;
}