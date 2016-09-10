import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const renderButton = (text, path) => (
  <LinkContainer to={`/manga/chapter/${path}`}>
    <Button block bsStyle="default">
      {text}
    </Button>
  </LinkContainer>
);

const Pagination = ({
  previous,
  next,
}) => {
  const left = previous ? renderButton(<span>&larr;</span>, previous) : false;
  const right = next ? renderButton(<span>&rarr;</span>, next) : false;

  return (
    <Row>
      <Col xs={6}>
        {left}
      </Col>
      <Col xs={6}>
        {right}
      </Col>
    </Row>
  );
};

Pagination.propTypes = {
  previous: React.PropTypes.string,
  next: React.PropTypes.string,
};

export default Pagination;
