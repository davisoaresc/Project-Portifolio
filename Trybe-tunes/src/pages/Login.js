import React from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loanding';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nameInput: '',
      loading: false,
      afterLogin: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClickOnButton = this.handleClickOnButton.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  async handleClickOnButton() {
    const { nameInput } = this.state;
    this.setState({ loading: true });
    await createUser({ name: nameInput });
    this.setState({
      loading: false,
      afterLogin: true,
    });
  }

  render() {
    const { nameInput, loading, afterLogin } = this.state;
    const MIN_LENGHT = 3;

    if (loading) return <Loading />;
    if (afterLogin) return <Redirect to="/search" />;
    return (
      <div data-testid="page-login">
        Login
        <form>
          <label htmlFor="loginNameInput">
            <input
              type="text"
              id="loginNameInput"
              name="nameInput"
              data-testid="login-name-input"
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            id="login-submit-button"
            data-testid="login-submit-button"
            disabled={ nameInput.length < MIN_LENGHT }
            onClick={ this.handleClickOnButton }
          >
            Entrar
          </button>
        </form>

      </div>
    );
  }
}

export default Login;
