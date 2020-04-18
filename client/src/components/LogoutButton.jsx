import React, { Component } from 'react';
import { withCurrentUser } from '../redux/connectors';
import makeRequest from '../services/makeRequest';
import { Button } from 'react-bootstrap';

class LogoutButton extends Component
{
  logout = () => {
    const { resetCurrentUser, fetchCurrentUserRequest } = this.props;

    fetchCurrentUserRequest();

    makeRequest('/logout')
    .then(
      response => resetCurrentUser()
    )
  }

  render = () => <Button variant="secondary" onClick={this.logout}>Déconnexion</Button>;
}

export default withCurrentUser(LogoutButton);
