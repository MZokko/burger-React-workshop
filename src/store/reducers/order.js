import * as actionTypes from '../actions/actionTypes';

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return {
        ...state,
        purchased: false,
      };
    case actionTypes.PURCHASE_BURGER_START: //handle the loading with redux
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
        purchased: true,
        orders: state.orders.concat(newOrder), // concat return a new array <= inmutable
      };

    case actionTypes.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        loading: false,
      };

    case actionTypes.FETCH_ORDER_START:
      return {
        ...state,
        loading: true,
      };

    case actionTypes.FETCH_ORDER_SUCCESS:
      return {
        ...state,
        orders: action.orders,
        loading: false,
      };

    case actionTypes.FETCH_ORDER_FAIL:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default reducer;
