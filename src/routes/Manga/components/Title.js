import React from 'react';
import { Col, Row } from 'react-bootstrap';
import classes from './Title.scss';

const Title = ({
  title,
}) => {
  if (!title) {
    return false;
  }

  return (
    <Row>
      <Col xs={12}>
        <h1 className={classes.title}>
          {title}
        </h1>
      </Col>
    </Row>
  );
};

Title.propTypes = {
  title: React.PropTypes.string,
};

export default Title;
