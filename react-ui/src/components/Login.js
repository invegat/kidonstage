/* eslint-disable no-console, no-class-assign, jsx-a11y/label-has-for, react/forbid-prop-types */
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { TextField } from 'redux-form-material-ui'
import TextField from 'material-ui/TextField';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faUser,
  faKey,
} from '@fortawesome/fontawesome-free-solid';
import { Link } from 'react-router-dom';
import { Navbar, NavbarBrand } from 'mdbreact';
import { login } from '../actions';
import './css/login.css';
import { RenderAlert } from '../App';

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    floatingLabelText={label}
    floatingLabelFocusStyle={{
      color: 'black',
    }}
    underlineFocusStyle={{
      borderColor: 'white',
    }}
    underlineStyle={{
      borderColor: 'grey',
    }}
    errorText={touched && error}
    {...input}
    {...custom}
    style={{
      color: 'red',
    }}
  />
);
renderTextField.defaultProps = {
  meta: { touched: PropTypes.bool, error: PropTypes.string },
  label: '',
};
renderTextField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  meta: PropTypes.object,
};
class SignIn extends Component {
  handleFormSubmit = ({ username, password }) => {
    // console.log(`username: ${username} password: ${password}`);
    this.props.login({ username, password }, this.props.history);
  };
  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="login--container">
        <div className="login--form_container">
          <Navbar className="login--box_navbar" dark>
            <NavbarBrand tag="span">Log In</NavbarBrand>
          </Navbar>

          {/* <div className="login--icon"></div> */}
          <div className="login--form">
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
              <fieldset>
                <FontAwesomeIcon icon={faUser} />{' '}
                <Field
                  className="login--form_field"
                  name="username"
                  component={renderTextField}
                  type="text"
                  label="Username"
                />
              </fieldset>
              <fieldset>
                <FontAwesomeIcon icon={faKey} />{' '}
                <Field
                  className="login--form_field"
                  name="password"
                  component={renderTextField}
                  type="password"
                  label="Password"
                />
              </fieldset>
              <button className="login--button" type="submit">
                Sign In <FontAwesomeIcon icon={faArrowRight} />
              </button>
              {RenderAlert(this)}
              <br /><br /><span>Not a member? <Link to="/signup">Sign Up!</Link></span>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

SignIn.defaultProps = {
  // error: null,
};
SignIn.propTypes = {
  login: PropTypes.func.isRequired,
  // error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  error: state.auth.error,
  authenticated: state.auth.authenticated,
});

SignIn = connect(mapStateToProps, { login })(SignIn);
/* eslint-disable no-class-assign */
// UserSignIn = connect(mapStateToProps, { login })(UserSignIn);

export default reduxForm({
  form: 'signin',
  fields: ['username', 'password'],
})(SignIn);

// export default reduxForm({
//   form: 'signin',
//   fields: ['username', 'password'],
// })(UserSignIn);
