import * as actionTypes from '../actions/actionTypes';

const initialState = {
  orders: [],
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_START://handle the loading with redux
      return {
        ...state,
        loading: true,
      };
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      // merge order data and order id in obj
      const newOrder = {
        ...action.orderData,
        id: action.orderId,
      };
      return {
        //store the order in order array && set loading to false
        ...state,
        loading: false,
        orders: state.orders.concat(newOrder), // concat return a new array <= inmutable
      };

    case actionTypes.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default reducer;
