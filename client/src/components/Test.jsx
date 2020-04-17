import React from 'react';
import { connect } from "react-redux";

const Test = ({ currentUser }) =>
  <div />
;

const mapStateToProps = state => {
  const { currentUser } = state;
  return { currentUser };
}

export default connect(mapStateToProps)(Test);
