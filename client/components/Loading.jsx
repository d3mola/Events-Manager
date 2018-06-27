import React from 'react';
import Loader from 'react-loader-spinner';

const Loading = () => (
  <div
    className="text-center fill-viewportt"
    style={{
      position: 'fixed',
      zIndex: '9999',
      margin: '0 auto',
      top: '20px',
      left: '50%'
    }}>
    <Loader type="TailSpin" color="#5cb85c" height="40" width="40" />
  </div>
);

export default Loading;
