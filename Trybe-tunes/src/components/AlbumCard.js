import React from 'react';
import PropTypes from 'prop-types';
import '../css/albumCard.css';
import { Link } from 'react-router-dom';

class AlbumCard extends React.Component {
  render() {
    const { albums: {
      artistName, collectionName, artworkUrl100, collectionId,
    } } = this.props;

    return (
      <div className="albumCardContainer">
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          <img src={ artworkUrl100 } alt={ collectionName } />

        </Link>

        <span>
          {artistName}
        </span>
        <span>
          {collectionName}
        </span>

      </div>
    );
  }
}

AlbumCard.propTypes = {
  artistName: PropTypes.string,
  collectionName: PropTypes.string,
  artworkUrl100: PropTypes.string,
  collectionPrice: PropTypes.number,
}.isRequired;

export default AlbumCard;
