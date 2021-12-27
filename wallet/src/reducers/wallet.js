import {
  ADD_EXPENSE,
  FETCH_CURRENCIES_ERROR,
  FETCH_CURRENCIES_SUCCESS,
  REMOVE_EXPENSE,
  UPDATE_EXPENSES_TOTAL,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  nextExpenseId: 0,
  totalExpenses: 0,
  error: null,
};

const calculateTotal = (expenses) => expenses.reduce(
  (total, { value, currency, exchangeRates }) => (
    total + (Number(value) * Number(exchangeRates[currency].ask))
  ), 0,
);

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_CURRENCIES_SUCCESS:
    return {
      ...state,
      currencies: action.payload,
      error: null,
    };
  case FETCH_CURRENCIES_ERROR:
    return {
      ...state,
      error: action.payload,
    };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        { id: state.nextExpenseId, ...action.payload },
      ],
      nextExpenseId: state.nextExpenseId + 1,
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter(({ id }) => id !== action.id),
    };
  case UPDATE_EXPENSES_TOTAL:
    return {
      ...state,
      totalExpenses: calculateTotal(state.expenses),
    };
  default:
    return { ...state,
      totalExpenses: calculateTotal(state.expenses) };
  }
};

export default walletReducer;
