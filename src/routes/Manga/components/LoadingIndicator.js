import React from 'react';
import { Snackbar } from 'material-ui';

const LoadingIndicator = ({ show = false, text = 'Loading...' }) => {
  if (!show) {
    return false;
  }

  return (
    <Snackbar
      open
      message={text}
      onRequestClose={() => {}}
    />
  );
};

LoadingIndicator.propTypes = {
  show: React.PropTypes.bool,
  text: React.PropTypes.string,
};

export default LoadingIndicator;
