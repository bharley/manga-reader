import React from 'react';
import { Alert } from 'react-bootstrap';

const Error = ({ error }) => {
  if (!error) {
    return false;
  }

  return (
    <Alert bsStyle="danger">
      <b>Error</b>
      {' '}
      {error}
    </Alert>
  );
};

Error.propTypes = {
  error: React.PropTypes.string,
};

export default Error;
