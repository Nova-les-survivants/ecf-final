import React, { Component } from 'react';
import { withCurrentUser } from '../redux/connectors';
import makeRequest from '../services/makeRequest';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

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

  render = () => (
    <Button {...this.props} variant="secondary" onClick={this.logout}>
      <FontAwesomeIcon icon={faSignOutAlt} />
      {' '}Déconnexion
    </Button>
  );
}

export default withCurrentUser(LogoutButton);
