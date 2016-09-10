import React from 'react';

export default class Navigator extends React.Component {
  static propTypes = {
    previous: React.PropTypes.string,
    next: React.PropTypes.string,
    pushRoute: React.PropTypes.func.isRequired,
    children: React.PropTypes.node,
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

  render() {
    const { children } = this.props;

    return (
      <div>
        {children}
      </div>
    );
  }
}
