import React, { Component } from 'react';
import { withCurrentUser } from '../redux/connectors';
import { Button, Form } from 'react-bootstrap';
import makeRequest, { HTTP_METHOD } from '../services/makeRequest';

class LoginForm extends Component
{
  login = () => {
    const { fetchCurrentUserFailure, fetchCurrentUserRequest, fetchCurrentUserSuccess } = this.props;

    fetchCurrentUserRequest();

    makeRequest('/login', HTTP_METHOD.POST, { username: 'admin@test.com', password: 'admin' })
    .then(
      response => fetchCurrentUserSuccess(response.data)
    )
    .catch(
      error => fetchCurrentUserFailure(error)
    )
  }

  submitLogin = (event) => {
    event.preventDefault();
    this.login();
  }

  render = () => {
    return (
      <Form onSubmit={this.submitLogin}>
        <Button type="submit">Connexion</Button>
      </Form>
    )
  }
}

export default withCurrentUser(LoginForm);
