import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import * as actionTypes from '../../store/actions/index'

class Checkout extends Component {


  CheckoutCancelHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinueHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    let summary = <Redirect to='/' />;

    if (this.props.ings) {
      const purchasedRedirect = this.props.purchased ? <Redirect to='/'/> : null;
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ings}
            CheckoutCancel={this.CheckoutCancelHandler}
            checkoutContinue={this.checkoutContinueHandler}
          />

          <Route
            path={this.props.match.path + '/contact-data'}
            component={ContactData}
            // render={(props)=>(<ContactData ingredients={this.props.ings} price={this.props.price} {...props}/>)}
          />
        </div>
      );
    }
    return <div>{summary}</div>;
  }
}

//redux
const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  };
};




export default connect(mapStateToProps)(Checkout);
