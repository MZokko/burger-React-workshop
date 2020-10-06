import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const CheckoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>enojy your burger</h1>
            <div style = {{width:'100%',margin:'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button
            btnType='Danger'
            clicked={props.CheckoutCancel}>CANCEL</Button>

            <Button
            btnType='Success'
            clicked={props.checkoutContinue}>Continue</Button>
        </div>
    );
}

export default CheckoutSummary;
