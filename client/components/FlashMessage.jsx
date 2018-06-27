// component/flash_message.js

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { clearFlashMessage } from '../actions/actionCreators';

class FlashMessage extends Component {
  handleMessageClear = () => {
    this.props.clearFlashMessage();
  };

  render() {
    const { message, className, error } = this.props;
    if (!message && !error) {
      return null;
    }

    return (
      <div className="container">
        <div className="row">
          <div
            style={{ height: 50, top: 300, zIndex: 1000 }}
            className={
              'col-md-12 font-weight-bold text-center alert ' + className
            }
            role="alert"
          >
            <span
              style={{ float: 'right', cursor: 'pointer' }}
              onClick={this.handleMessageClear}
            >
              X
            </span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ flashMessages }) => ({
  message: flashMessages.message,
  className: flashMessages.className,
  error: flashMessages.error
});

FlashMessage.propTypes = {
  message: PropTypes.string,
  className: PropTypes.string,
  error: PropTypes.string,
  clearFlashMessage: PropTypes.func
};

export default connect(mapStateToProps, { clearFlashMessage })(FlashMessage);
