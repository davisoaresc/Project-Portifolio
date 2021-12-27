import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loanding';
// import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      musicApiResponse: [],
      songList: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.getSongsResults();
  //  this.requestGetFavoriteSongs();
  }

  getSongsResults = async () => {
    const { match: { params: { id } } } = this.props;
    const response = await getMusics(id);
    this.setState({
      musicApiResponse: response[0],
      songList: response,
    });
  };

  render() {
    const { musicApiResponse, songList, loading } = this.state;
    if (loading) return <Loading />;
    return (
      <div data-testid="page-album">
        <Header />
        <h2 data-testid="artist-name">{musicApiResponse.artistName}</h2>
        <h4 data-testid="album-name">{musicApiResponse.collectionName}</h4>
        <div>
          {songList.slice(1).map((song) => (
            <MusicCard
              key={ song.trackId }
              song={ song }
            />
          ))}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
