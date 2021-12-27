import React from 'react';
import PropTypes from 'prop-types';

class WalletInput extends React.Component {
  render() {
    const { testid, name, type, labelText, value, onChange, ...other } = this.props;
    return (
      <div className="label-container">
        <label htmlFor={ `expense-${name}` } className="wallet-label">
          {labelText}
          <input
            className="wallet-inputs"
            data-testid={ testid }
            type={ type }
            id={ `expense-${name}` }
            name={ name }
            required
            value={ value }
            onChange={ onChange }
            { ...other }
          />
        </label>
      </div>
    );
  }
}

WalletInput.propTypes = {
  testid: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  labelText: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

WalletInput.defaultProps = {
  type: 'text',
};

export default WalletInput;
