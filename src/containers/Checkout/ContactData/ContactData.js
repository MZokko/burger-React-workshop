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
        Validation: {
          required: true,
        },
        valid: false,
      },
      street: {
        elementType: 'input',
        elementConfig: { type: 'text', placeholder: 'Your Street' },
        value: '',
        Validation: {
          required: true,
        },
        valid: false,
      },
      zipCode: {
        elementType: 'input',
        elementConfig: { type: 'text', placeholder: 'ZIP Code' },
        value: '',
        Validation: {
          required: true,
          minlength: 5,
          maxlength: 5,
        },
        valid: false,
      },
      country: {
        elementType: 'input',
        elementConfig: { type: 'text', placeholder: 'Country' },
        value: '',
        Validation: {
          required: true,
        },
        valid: false,
      },
      email: {
        elementType: 'input',
        elementConfig: { type: 'email', placeholder: 'Your mail' },
        value: '',
        Validation: {
          required: true,
        },
        valid: false,
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

    this.setState({ loading: true });

    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }

    const order = {
      ingredient: this.props.ingredients,
      price: this.props.price,
      orderData: formData,
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

  checkValidity = (value, rules) => {
    let isValid = true;

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

  inputChangedHandler = (event, inputIdentifier) => {
    //clone
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };

    updatedFormElement.value = event.target.value;
    //validation
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.Validation
    );
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    console.log(updatedFormElement);
    this.setState({ orderForm: updatedOrderForm });
  };

  render() {
    const formElementArray = [];

    for (let key in this.state.orderForm) {
      formElementArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementArray.map((formElement) => {
          return (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              changed={(event) =>
                this.inputChangedHandler(event, formElement.id)
              }
            />
          );
        })}
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
