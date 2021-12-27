import React from 'react';
import PropTypes from 'prop-types';
import AlbumCard from './AlbumCard';

class AlbumList extends React.Component {
  render() {
    const { albums } = this.props;

    return (
      <>
        {albums.map((album) => (<AlbumCard
          albums={ album }
          key={ album.collectionId }
        />))}

      </>
    );
  }
}

AlbumList.propTypes = {
  albums: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
};

export default AlbumList;
