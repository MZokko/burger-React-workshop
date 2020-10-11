import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: { street: '', postCode: '' },
    loading: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    // dummy price not save to calculate the price this way and not on server
    this.setState({ loading: true });
    const order = {
      ingredient: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'John',
        adress: { street: '44 street', zipCode: '39222', country: 'Australia' },
        email: 'test@test.com',
      },
      deliveryMethod: 'foot',
    };

    axios
      .post('/order.json', order)
      .then((response) => {
        console.log(response);
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loading: false });
      });
  };

  render() {
    let form = (
      <form>
        <input
          className={classes.Input}
          type='text'
          name='name'
          placeholder='your name'
        />
        <input
          className={classes.Input}
          type='email'
          name='email'
          placeholder='email@email.email'
        />
        <input
          className={classes.Input}
          type='text'
          name='street'
          placeholder='your street'
        />
        <input
          className={classes.Input}
          type='text'
          name='postal'
          placeholder='your postal code'
        />
        <Button btnType='Success' clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>enter your contact data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
