// component/flash_message.js

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class FlashMessage extends Component {
  render() {
    const { message, className, error } = this.props;
    if (!message && !error) {
      return null;
    }

    return (
      <div className="container">
        <div className="row">
          <div
            style={{ height: 50 }}
            className={
              'col-md-12 font-weight-bold text-center alert ' + className
            }
            role="alert"
          >
            {message || error}
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
  error: PropTypes.string
};

export default connect(mapStateToProps)(FlashMessage);
