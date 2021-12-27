import React from 'react';
import '../styles/header.css';
import { GiWallet } from 'react-icons/gi';
import { CgProfile } from 'react-icons/cg';

class LoginHeader extends React.Component {
  render() {
    return (
      <header className="header">
        <div className="wallet-infos-header">
          <span><GiWallet size={ 50 } className="react-icons" /></span>
        </div>
        <div className="email-container">
          <span><CgProfile size={ 30 } /></span>
        </div>
      </header>
    );
  }
}

export default LoginHeader;
