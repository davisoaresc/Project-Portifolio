import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loanding';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchUserData();
  }

  fetchUserData() {
    getUser()
      .then((response) => this.setState({
        name: response.name,
        loading: false,
      }));
  }

  render() {
    const { name, loading } = this.state;
    return (
      <header data-testid="header-component">
        { loading ? <Loading />
          : (
            <h3 data-testid="header-user-name">
              Ola
              { name }
              , bem-vindo
            </h3>
          )}
        <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
        <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
      </header>
    );
  }
}

export default Header;
