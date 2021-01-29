import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner'
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import {Redirect} from 'react-router-dom'

export class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: { type: 'email', placeholder: 'mail adress' },
        value: '',
        Validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: 'input',
        elementConfig: { type: 'password', placeholder: 'Password' },
        value: '',
        Validation: {
          required: true,
          minlength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    isSignUp: true,
  };

  checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minlength) {
      isValid = value.length >= rules.minlength && isValid;
    }

    if (rules.maxlength) {
      isValid = value.length <= rules.maxlength && isValid;
    }

    return isValid;
  };

  inputChangedHandler = (event, controlName) => {
    //create updated form control update the elements
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[controlName].Validation
        ),
        touched: true,
      },
    };
    this.setState({ controls: updatedControls });
  };

  submitHandler = (event) => {
    event.preventDefault(); // avoid to reload the all pagefor this event
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    );
  };

  swithAuthModeHandler = () => {
    this.setState((prevState) => {
      return { isSignUp: !prevState.isSignUp };
    });
  };

  render() {
    const formElementArray = [];

    for (let key in this.state.controls) {
      formElementArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    let form = formElementArray.map((formElement) => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.Validation}
        touched={formElement.config.touched}
        changed={(event) => this.inputChangedHandler(event, formElement.id)}
      />
    ));

    if (this.props.loading) {
      form=<Spinner />;
    }

    let errorMessage =null;

    if (this.props.error) {
      errorMessage =(<p>{this.props.error.message}</p>)
    }

    let authRedirect = null
    if (this.props.isSignUp) {
      authRedirect=<Redirect to='/' />
    }
    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType='Success'>Submit</Button>
        </form>
        <Button 
        clicked={this.swithAuthModeHandler}
        btnType='Danger'>Switch to {this.state.isSignUp ? 'Login' : 'create account'}</Button>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isSignUp : state.auth.token!==null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password,isSignUp)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
