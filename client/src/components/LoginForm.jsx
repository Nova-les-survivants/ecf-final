import React, { Component } from 'react';
import { withCurrentUser } from '../redux/connectors';
import { Button, Form, FormGroup, FormControl, Alert } from 'react-bootstrap';
import makeRequest, { HTTP_METHOD } from '../services/makeRequest';
import { FETCH_FAILED } from '../redux/status';

class LoginForm extends Component
{
  state = {
    username: '',
    password: '',
  }

  login = (username, password) => {
    const { fetchCurrentUserFailure, fetchCurrentUserRequest, fetchCurrentUserSuccess } = this.props;

    fetchCurrentUserRequest();

    makeRequest('/login', HTTP_METHOD.POST, { username, password })
    .then(
      response => fetchCurrentUserSuccess(response.data)
    )
    .catch(
      error => fetchCurrentUserFailure(error)
    )
  }

  submitLogin = (event) => {
    const { username, password } = this.state;

    event.preventDefault();
    this.login(username, password);
  }

  handleChange = (propName) => (event) => {
    this.setState({ [propName]: event.target.value });
  }

  render = () => {
    const { currentUser } = this.props;
    const { username, password } = this.state;

    let message;
    if (currentUser.status === FETCH_FAILED) {
      const status = currentUser.error.response.status;

      switch (status) {
        case 404:
          message = {
            type: 'danger',
            content:'Ce nom d\'utilisateur n\'existe pas!',
          };
          break;
        
        case 401:
          message = {
            type: 'danger',
            content: 'Mot de passe invalide!',
          }
          break;

        default:
          message = {
            type: 'danger',
            content: 'Une erreur est survenue, merci de réessayer plus tard...'
          }
      }
    }

    return (
      <Form onSubmit={this.submitLogin}>
        { message && <Alert variant={message.type}>{message.content}</Alert>}
        <FormGroup>
          <Form.Label>E-mail</Form.Label>
          <FormControl placeholder="E-mail" value={username} onChange={this.handleChange('username')} />
        </FormGroup>
        <FormGroup>
          <Form.Label>Mot de passe</Form.Label>
          <FormControl type="password" placeholder="Mot de passe" value={password} onChange={this.handleChange('password')} />
        </FormGroup>
        <Button type="submit">Connexion</Button>
      </Form>
    )
  }
}

export default withCurrentUser(LoginForm);
