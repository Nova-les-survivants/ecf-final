import React, { Component } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import makeRequest, { HTTP_METHOD } from '../services/makeRequest';
import { Layout } from '../components';
import { Redirect } from 'react-router-dom';
import { withCurrentUser } from '../redux/connectors';
import { FETCH_SUCCESSFUL } from '../redux/status';

class SignupPage extends Component
{
  state = {
    username: '',
    password: '',
    errorMessage: null,
    redirect: false,
  }

  componentDidMount = () => {
    const { currentUser } = this.props;

    if (currentUser.status === FETCH_SUCCESSFUL) {
      this.setState({ redirect: true });
    }
  }

  createUser = (username, password) => {
    const { fetchCurrentUserSuccess } = this.props;

    makeRequest('/user/', HTTP_METHOD.POST, {
      username,
      password,
      autoconnect: true,
    })
    .then(
      response => {
        fetchCurrentUserSuccess(response.data);
        this.setState({ redirect: true });
      }
    )
    .catch(
      error => this.setState({ errorMessage: 'Erreur durant l\'envoi du nouvel utilisateur.'})
    )
  }

  handleChange = (propName) => (event) => {
    this.setState({ [propName]: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;

    if (password.length < 8) {
      this.setState({ errorMessage: 'Le mot de passe doit faire au moins 8 caractères.'});
      return;
    }

    this.createUser(username, password);
  }

  render = () => {
    const { username, password, errorMessage, redirect } = this.state;

    if (redirect) {
      return <Redirect to="/" />;
    }

    return (
      <Layout errorMessage={errorMessage}>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>E-mail</Form.Label>
            <FormControl placeholder="E-mail" type="email" value={username} onChange={this.handleChange('username')} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Mot de passe</Form.Label>
            <FormControl placeholder="Mot de passe" type="password" value={password} onChange={this.handleChange('password')} />
          </Form.Group>
          <Button type="submit">Valider</Button>
        </Form>
      </Layout>
    );
  }
}

export default withCurrentUser(SignupPage);
