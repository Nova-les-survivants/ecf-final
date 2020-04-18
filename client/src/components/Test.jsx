import React from 'react';
import { withCurrentUser } from '../redux/connectors';
import { FETCHING, NEED_FETCHING, FETCH_FAILED } from '../redux/status';
import { Spinner } from '../styles';

const NotConnected = () => <div>Vous n'êtes pas connecté.</div>;

const Test = ({ currentUser, test }) => {
  switch (currentUser.status) {
    case NEED_FETCHING:
      return <NotConnected />

    case FETCHING:
      return <Spinner />;

    case FETCH_FAILED:
      return <NotConnected />;
  }
  
  const user = currentUser.data;

  return (
    <div>
      <h1>Vous êtes connecté!</h1>
      <p>{test}</p>
      <ul>
        <li>Id: {user.id}</li>
        <li>E-mail: {user.email}</li>
      </ul>
    </div>
  );
}

export default withCurrentUser(Test);
