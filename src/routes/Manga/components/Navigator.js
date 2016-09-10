import React from 'react';
import Measure from 'react-measure';
import Swipeable from 'react-swipeable';

export default class Navigator extends React.Component {
  static propTypes = {
    previous: React.PropTypes.string,
    next: React.PropTypes.string,
    pushRoute: React.PropTypes.func.isRequired,
    children: React.PropTypes.node,
  };

  state = {
    width: 300,
  };

  componentWillMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  goTo(chapter) {
    if (chapter) {
      this.props.pushRoute(`/manga/chapter/${chapter}`);
    }
  }

  goBack() {
    this.goTo(this.props.previous);
  }

  goForward() {
    this.goTo(this.props.next);
  }

  handleKeyDown = ({ key }) => {
    if (key === 'ArrowLeft') {
      this.goBack();
    } else if (key === 'ArrowRight') {
      this.goForward();
    }
  };

  handleSwipedLeft = () => {
    this.goForward();
  };

  handleSwipedRight = () => {
    this.goBack();
  };

  handleMeasure = ({ width }) => {
    this.setState({ width });
  };

  render() {
    const { children } = this.props;
    const { width } = this.state;

    return (
      <Measure onMeasure={this.handleMeasure}>
        <Swipeable
          delta={width * 0.35} // 35% of the width
          onSwipedLeft={this.handleSwipedLeft}
          onSwipedRight={this.handleSwipedRight}
        >
          {children}
        </Swipeable>
      </Measure>
    );
  }
}
