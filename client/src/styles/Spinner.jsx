import React from 'react';
import { Container, Spinner as BootstrapSpinner } from 'react-bootstrap';

const Spinner = () =>
  <Container>
    <BootstrapSpinner animation="grow" variant="primary" />
  </Container>
;

export default Spinner;
