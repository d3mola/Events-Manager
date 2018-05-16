// Link.react.js
import React from 'react';
import PropTypes from 'prop-types';

const STATUS = {
  HOVERED: 'hovered',
  NORMAL: 'normal'
};

export default class Link extends React.Component {
  state = {
    class: STATUS.NORMAL
  };

  _onMouseEnter = () => {
    this.setState({ class: STATUS.HOVERED });
  };

  _onMouseLeave = () => {
    this.setState({ class: STATUS.NORMAL });
  };

  render() {
    console.log(this.props)
    return (
      <a
        className={this.state.class}
        href={this.props.page || '#'}
        onMouseEnter={this._onMouseEnter}
        onMouseLeave={this._onMouseLeave}
      >
        {this.props.children}
      </a>
    );
  }
}

Link.propTypes = {
  page: PropTypes.string,
}
