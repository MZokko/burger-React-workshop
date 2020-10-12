import React from 'react';
import classes from './Order.css';

const Order = (props) => {
    return (
        <div className={classes.Order}>
            <p>Ingredients : salad(1)</p>
            <p>price:<strong>USD 455</strong></p>
        </div>
    );
}

export default Order;
