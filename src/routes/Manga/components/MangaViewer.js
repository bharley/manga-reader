import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Navigator from './Navigator';
import Title from './Title';
import LoadingIndicator from './LoadingIndicator';
import Error from './Error';
import Pagination from './Pagination';
import Images from './Images';

const MangaViewer = ({
  error,
  images,
  chapter,
  next,
  previous,
  pushRoute,
}) => (
  <Navigator next={next} previous={previous} pushRoute={pushRoute}>
    <LoadingIndicator show={!error && !images} />
    <Title title={chapter} />
    <Pagination next={next} previous={previous} />
    <Row>
      <Col xs={12}>
        <Error error={error} />
        <Images chapter={chapter} images={images} />
      </Col>
    </Row>
    <Pagination next={next} previous={previous} />
    <Title title={chapter} />
  </Navigator>
);

MangaViewer.propTypes = {
  chapter: React.PropTypes.string,
  error: React.PropTypes.string,
  images: React.PropTypes.arrayOf(React.PropTypes.string),
  previous: React.PropTypes.string,
  next: React.PropTypes.string,
  pushRoute: React.PropTypes.func.isRequired,
};

export default MangaViewer;
