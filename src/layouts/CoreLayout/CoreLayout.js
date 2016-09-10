import React from 'react';
import { Grid } from 'react-bootstrap';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css'; // eslint-disable-line no-unused-vars
import '../../styles/core.scss';

injectTapEventPlugin();

export const CoreLayout = ({ children }) => (
  <MuiThemeProvider>
    <Grid>
      {children}
    </Grid>
  </MuiThemeProvider>
);

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired,
};

export default CoreLayout;
