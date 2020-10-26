import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: { type: 'text', placeholder: 'Your name' },
        value: '',
      },
      street: {
        elementType: 'input',
        elementConfig: { type: 'text', placeholder: 'Your Street' },
        value: '',
      },
      zipCode: {
        elementType: 'input',
        elementConfig: { type: 'text', placeholder: 'ZIP Code' },
        value: '',
      },
      country: {
        elementType: 'input',
        elementConfig: { type: 'text', placeholder: 'Country' },
        value: '',
      },
      email: {
        elementType: 'input',
        elementConfig: { type: 'email', placeholder: 'Your mail' },
        value: '',
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'Fastest', displayValue: 'Fastest' },
            { value: 'Cheapest', displayValue: 'Cheapest' },
          ],
        },
        value: '',
      },
    },
    loading: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    // dummy price not save to calculate the price this way and not on server
    this.setState({ loading: true });
    const order = {
      ingredient: this.props.ingredients,
      price: this.props.price,
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
        <Input
          elementType="" elementConfig="" value=""
        />
        <Input
          inputtype='input'
          type='email'
          name='email'
          placeholder='email@email.email'
        />
        <Input
          inputtype='input'
          type='text'
          name='street'
          placeholder='your street'
        />
        <Input
          inputtype='input'
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
