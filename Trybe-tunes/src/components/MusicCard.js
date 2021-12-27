import React from 'react';
import PropTypes from 'prop-types';
import '../css/musicCard.css';
import '../css/inputFavoriteCheckbox.css';
import Loading from './Loanding';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      checked: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.toggleFavorites();
  }

  async handleClick() {
    const { song } = this.props;
    const { checked } = this.state;
    if (!checked) {
      this.setState({
        loading: true,
      });
      await addSong(song);
      this.setState({
        loading: false,
        checked: true,
      });
    } else {
      this.setState({
        loading: true,
      });
      await removeSong(song);
      this.setState({
        loading: false,
        checked: false,
      });
    }
  }

  async toggleFavorites() {
    const { song: { trackId } } = this.props;
    this.setState({
      loading: true,
    });
    const favorite = await getFavoriteSongs();
    const arrayOfId = favorite.map((element) => element.trackId);
    if (arrayOfId.includes(trackId)) {
      return this.setState({
        checked: true,
        loading: false,
      });
    }
    return this.setState({
      checked: false,
      loading: false,
    });
  }

  render() {
    const { song: { trackName, previewUrl, trackId } } = this.props;
    const { loading, checked } = this.state;

    if (loading) {
      return <Loading />;
    }
    return (
      <div className="musicCardContainer">
        <span>{trackName}</span>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label htmlFor={ `checkbox-music-${trackId}` }>
          Favorita
          <div className="containerInputFavorite">
            <input
              type="checkbox"
              checked={ checked }
              onChange={ this.handleClick }
              name={ trackId }
              data-testid={ `checkbox-music-${trackId}` }

            />
          </div>
        </label>

      </div>
    );
  }
}

MusicCard.propTypes = {
  song: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
};

export default MusicCard;
