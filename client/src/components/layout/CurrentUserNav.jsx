import React, { Fragment } from 'react';
import { withCurrentUser } from '../../redux/connectors';
import { FETCHING, FETCH_SUCCESSFUL } from '../../redux/status';
import { Nav, Navbar, Button } from 'react-bootstrap';
import { Spinner } from '../../styles';
import { Link } from 'react-router-dom';
import LogoutButton from '../LogoutButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserAlt } from '@fortawesome/free-solid-svg-icons';

const CurrentUserNav = ({ currentUser }) =>
  <Fragment>
  { currentUser.status === FETCHING ?
    <Nav>
      <Spinner />
    </Nav>
    :
      currentUser.status === FETCH_SUCCESSFUL ?
        <Nav>
          <Link to="/create" className="nav-link">Mes recettes</Link>
          <Navbar.Text>
            <LogoutButton size="sm" />
          </Navbar.Text>
        </Nav>
      :
        <Nav>
          <Link to="/signup">
            <Button size="sm" variant="success">
              <FontAwesomeIcon icon={faUserAlt} />
              {' '}Inscription
            </Button>
          </Link>
          <Link to="/login">
            <Button size="sm">
              <FontAwesomeIcon icon={faSignInAlt} />
              {' '}Connexion
            </Button>
          </Link>
        </Nav>
    }
  </Fragment>
;

export default withCurrentUser(CurrentUserNav);
