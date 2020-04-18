import { connect } from "react-redux";
import { fetchCurrentUserRequest, fetchCurrentUserSuccess, fetchCurrentUserFailure, resetCurrentUser } from '../actions';

const mapStateToProps = state => ({ currentUser: state.currentUser });

const mapDispatchToProps = {
  fetchCurrentUserRequest,
  fetchCurrentUserSuccess,
  fetchCurrentUserFailure,
  resetCurrentUser,
};

export default (component) =>
  connect(mapStateToProps, mapDispatchToProps)(component)
;
