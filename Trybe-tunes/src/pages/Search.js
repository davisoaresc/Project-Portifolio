import React from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loanding';
import AlbumList from '../components/AlbumList';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      searchInput: '',
      loading: false,
      artistName: '',
      albumsData: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.showSearchStatus = this.showSearchStatus.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  async handleSearchClick() {
    const { searchInput } = this.state;
    this.setState({ loading: true });
    const getAlbumsAPI = await searchAlbumsAPI(searchInput);
    this.setState({
      searchInput: '',
      loading: false,
      artistName: searchInput,
      albumsData: getAlbumsAPI,
    });
  }

  showSearchStatus() {
    const { albumsData, artistName } = this.state;
    if (albumsData.length === 0) {
      return <span>Nenhum álbum foi encontrado</span>;
    }
    return (
      <div>
        <h3>
          Resultado de álbuns de:
          {' '}
          {artistName}
        </h3>
      </div>
    );
  }

  render() {
    const { searchInput, loading, artistName, albumsData } = this.state;
    const MIN_LENGHT = 2;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <div>
            <label htmlFor="searchInput">
              <input
                type="text"
                name="searchInput"
                value={ searchInput }
                data-testid="search-artist-input"
                placeholder="Artistas ou bandas"
                onChange={ this.handleChange }
              />
            </label>
          </div>
          <button
            type="button"
            id="searchArtistButton"
            data-testid="search-artist-button"
            disabled={ searchInput.length < MIN_LENGHT }
            onClick={ this.handleSearchClick }
          >
            Search
          </button>
        </form>
        <div>
          <div>
            {this.showSearchStatus()}
          </div>
          {loading ? <Loading /> : <AlbumList
            albums={ albumsData }
            artist={ artistName }
          />}
        </div>
      </div>
    );
  }
}

export default Search;
