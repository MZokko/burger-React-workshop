import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state={
        orders:[],
        loading:true,
    }
    componentDidMount() {
        axios.get('order.json')
        .then(res=>{
            //console.log(res.data)
            const fetchOrder=[]
            for (let key in res.data) {
                fetchOrder.push({...res.data[key], id:key})
                
            }

            this.setState({loading:false,})

        })
        .catch(error=>{
            this.setState({loading:false,})
        })
    }
    
    render() {
        return (
            <div>
                <Order/>
                <Order/>
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios) ;
