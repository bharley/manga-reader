import React from 'react';
import { Alert, Col, Row } from 'react-bootstrap';
import { Snackbar } from 'material-ui';
import Title from './Title';
import Pagination from './Pagination';

export default class MangaViewer extends React.Component {
  static propTypes = {
    chapter: React.PropTypes.string,
    error: React.PropTypes.string,
    images: React.PropTypes.arrayOf(React.PropTypes.string),
    previous: React.PropTypes.string,
    next: React.PropTypes.string,
  };

  renderError(error) {
    return (
      <Col xs={12}>
        <Alert bsStyle="danger">
          <b>Error</b>
          {' '}
          {error}
        </Alert>
      </Col>
    );
  }

  renderLoading() {
    return (
      <Snackbar
        open
        message="Loading..."
        onRequestClose={() => {}}
      />
    );
  }

  renderImages() {
    const { images, chapter } = this.props;

    return (
      <Col xs={12}>
        {images.map((image, index) => (
          <img
            key={`image ${index}`}
            src={image}
            className="img-responsive"
            alt={`${chapter}, page ${index + 1}`}
          />
        ))}
      </Col>
    );
  }

  render() {
    const { error, images, chapter, next, previous } = this.props;

    let partial;
    if (error) {
      partial = this.renderError(error);
    } else if (!images) {
      partial = this.renderLoading();
    } else {
      partial = this.renderImages();
    }

    return (
      <div>
        <Title title={chapter} />
        <Pagination next={next} previous={previous} />
        <Row>
          {partial}
        </Row>
        <Pagination next={next} previous={previous} />
        <Title title={chapter} />
      </div>
    );
  }
}
