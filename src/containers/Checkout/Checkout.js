import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  // state = {
  //   ingredients: null, price:0,
  // };

  // componentWillMount() {
  //   const query = new URLSearchParams(this.props.location.search);
  //   const ingredients = {};
  //   let price=0;
  //   for (let param of query.entries()) {
  //     //['salad,'1']
  //     if(param[0]==='price'){
  //       price = +param[1]
  //     }else{
  //       ingredients[param[0]] = +param[1];
  //     }
  //   }
  //   this.setState({ ingredients: ingredients , totalPrice: price});
  // }

  CheckoutCancelHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinueHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    let summary = <Redirect to='/' />;

    if (this.props.ings) {
      summary = (
        <div>
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
    ings: state.ingredients,
    price: state.totalPrice,
  };
};
//nothing need to be send to redux from checkout
// const mapDispatchToProps = (dispatch)=>{}

export default connect(mapStateToProps)(Checkout);
