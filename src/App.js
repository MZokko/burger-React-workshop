import React, { Component } from 'react';
import { connect } from 'react-redux';
import ascyncComponent from './hoc/ascyncComponent/ascyncComponent'
import Layout from './hoc/Layout/Layout';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
//import Checkout from './containers/Checkout/Checkout';
//import Orders from './containers/Orders/Orders';
//import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
//lazy loadings
const asyncCheckout = ascyncComponent(()=>{
  return import('./containers/Checkout/Checkout')
})
const asyncOrders = ascyncComponent(()=>{
  return import('./containers/Orders/Orders')
})
const asyncAuth = ascyncComponent(()=>{
  return import('./containers/Auth/Auth')
})


class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignUp();
  }
  render() {
    //guarding the route order and checkout
    //unAuth user routes
    let routes = (
      <Switch>
        <Route path='/auth' component={asyncAuth} />
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to='/' />
      </Switch>
    );
    //Auth user routes
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/auth' component={asyncAuth} />
          <Route path='/' exact component={BurgerBuilder} />
          <Route path='/checkout' component={asyncCheckout} />
          <Route path='/orders' component={asyncOrders} />
          <Route path='/logout' component={Logout} />
          <Redirect to='/' />
        </Switch>
      );
    }
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState()),
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
