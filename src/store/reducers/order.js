import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};
const purchaseInit = (state, action) => {
  return updateObject(state, { purchased: false });
};

const purchaseBurgerStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const purchaseBurgerSucess = (state, action) => {
  const newOrder = {
    ...action.orderData,
    id: action.orderId,
  };
  return updateObject(state, {
    loading: false,
    purchased: true,
    orders: state.orders.concat(newOrder),
  });
};

const purchaseBurgerFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const fetchcOrderStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchcOrderSuccess = (state, action) => {
  return updateObject(state, { orders: action.orders, loading: false });
};

const fetchOrderFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return purchaseInit(state, action);

    case actionTypes.PURCHASE_BURGER_START:
      return purchaseBurgerStart(state, action); //handle the loading with redux

    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSucess(state, action); // merge order data and order id in obj

    case actionTypes.PURCHASE_BURGER_FAIL:
      return purchaseBurgerFail(state, action);

    case actionTypes.FETCH_ORDER_START:
      return fetchcOrderStart(state, action);

    case actionTypes.FETCH_ORDER_SUCCESS:
      return fetchcOrderSuccess(state, action);

    case actionTypes.FETCH_ORDER_FAIL:
      return fetchOrderFail(state, action);

    default:
      return state;
  }
};

export default reducer;
