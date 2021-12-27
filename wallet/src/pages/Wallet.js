import React from 'react';
import WalletTable from '../components/WalletTable';
import WalletForm from '../components/WalletForm';
import WalletHeader from '../components/WalletHeader';

class Wallet extends React.Component {
  render() {
    return (
      <section className="wallet">
        <WalletHeader />
        <WalletForm />
        <WalletTable />
      </section>
    );
  }
}

export default Wallet;
