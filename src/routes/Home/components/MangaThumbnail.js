import React from 'react';
import { Button, Thumbnail } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const MangaThumbnail = ({ name, slug, thumbnail, description }) => (
  <Thumbnail src={thumbnail} alt={name}>
    <h3>{name}</h3>
    <p>{description}</p>
    <p>
      <LinkContainer to={`/manga/${slug}`}>
        <Button
          block
          bsStyle="primary"
        >
          Read
        </Button>
      </LinkContainer>
    </p>
  </Thumbnail>
);

MangaThumbnail.propTypes = {
  name: React.PropTypes.string.isRequired,
  slug: React.PropTypes.string.isRequired,
  thumbnail: React.PropTypes.string.isRequired,
  description: React.PropTypes.string.isRequired,
};

export default MangaThumbnail;
