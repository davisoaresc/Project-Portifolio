import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExpense, fetchCurrencies } from '../actions';
import WalletSelect from './WaletSelect';
import WalletInput from './WalletInput';
import '../styles/form.css';

const INITIAL_STATE = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
};

class WalletForm extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitExpense = this.submitExpense.bind(this);
  }

  componentDidMount() {
    const { setCurrencies } = this.props;
    setCurrencies();
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  submitExpense(event) {
    event.preventDefault();
    const { setNewExpense } = this.props;
    setNewExpense(this.state);
    this.setState({ ...INITIAL_STATE });
  }

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <form className="wallet-form" onSubmit={ this.submitExpense }>
        <WalletInput
          name="value"
          type="number"
          testid="value-input"
          labelText="Valor"
          value={ value }
          onChange={ this.handleChange }
        />
        <WalletInput
          name="description"
          labelText="Descrição"
          testid="description-input"
          value={ description }
          onChange={ this.handleChange }
        />
        <WalletSelect
          name="currency"
          testid="currency-input"
          labelText="Moeda"
          options={ currencies.filter((curr) => curr !== 'USDT') }
          value={ currency }
          onChange={ this.handleChange }
        />
        <WalletSelect
          name="method"
          testid="method-input"
          labelText="Método de pagamento"
          options={ methods }
          value={ method }
          onChange={ this.handleChange }
        />
        <WalletSelect
          name="tag"
          labelText="Tag"
          testid="tag-input"
          options={ tags }
          value={ tag }
          onChange={ this.handleChange }
        />
        <button type="submit" className="submit-wallet">Adicionar despesa</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrencies: () => dispatch(fetchCurrencies()),
  setNewExpense: (expense) => dispatch(addExpense(expense)),
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  setCurrencies: PropTypes.func.isRequired,
  setNewExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
