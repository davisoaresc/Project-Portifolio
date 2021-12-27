import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BiEditAlt } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { removeExpense } from '../actions';

class WalletTable extends React.Component {
  formatMonetaryValue(strOrNumber) {
    return `${Number(strOrNumber).toFixed(2)}`;
  }

  convertToBRL(exchangeRates, currency, value) {
    return (exchangeRates[currency].ask * value);
  }

  renderExpenseRow(
    { id, description, tag, method, value, currency, exchangeRates },
  ) {
    const { setRemoveExpense } = this.props;
    return (
      <tr key={ id }>
        <td>{ description }</td>
        <td>{ tag }</td>
        <td>{ method }</td>
        <td>{ value }</td>
        <td>{ exchangeRates[currency].name.split('/')[0] }</td>
        <td>{ this.formatMonetaryValue(exchangeRates[currency].ask) }</td>
        <td>
          { this.formatMonetaryValue(
            this.convertToBRL(exchangeRates, currency, value),
          ) }
        </td>
        <td>Real</td>
        <td>
          <div className="icons">
            <BiEditAlt size={ 25 } className="icon1" />
            <RiDeleteBin6Line
              size={ 25 }
              className="delete"
              data-testid="delete-btn"
              onClick={ () => setRemoveExpense(id) }
            />
            {/* <button
              type="button"
              data-testid="delete-btn"
              onClick={ () => setRemoveExpense(id) }
            >
            </button> */}
          </div>
        </td>
      </tr>
    );
  }

  render() {
    const { expenses } = this.props;
    return (
      <div className="expenses-table">
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            { expenses.map((expense) => this.renderExpenseRow(expense)) }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  setRemoveExpense: (id) => dispatch(removeExpense(id)),
});

WalletTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  setRemoveExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletTable);
