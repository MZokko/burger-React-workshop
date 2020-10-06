import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
  state = {
    ingredients: { salad: 1, meat: 1, cheese: 1, bacon: 1 },
  };
  CheckoutCancelHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinueHandler = () => {
    this.props.replace('/checkout/contact-data');
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          CheckoutCancel={this.CheckoutCancelHandler}
          checkoutContinue={this.checkoutContinueHandler}
        />
      </div>
    );
  }
}

export default Checkout;
