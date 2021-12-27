import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../styles/header.css';
import { GiWallet } from 'react-icons/gi';
import { CgProfile } from 'react-icons/cg';

class WalletHeader extends React.Component {
  render() {
    const { email, totalExpenses } = this.props;
    return (
      <header className="header">
        <div className="wallet-infos-header">
          <span><GiWallet size={ 50 } className="react-icons" /></span>
          <p data-testid="total-field">{totalExpenses.toFixed(2)}</p>
          <p data-testid="header-currency-field">BRL</p>
        </div>
        <div className="email-container">
          <span><CgProfile size={ 30 } /></span>
          <p data-testid="email-field">{email}</p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  totalExpenses: state.wallet.totalExpenses,
});

WalletHeader.propTypes = {
  email: PropTypes.string.isRequired,
  totalExpenses: PropTypes.number,
};

WalletHeader.defaultProps = {
  totalExpenses: 0,
};

export default connect(mapStateToProps)(WalletHeader);
