import React from 'react';
import Loader from 'react-loader-spinner';

const Loading = () => (
  <div
    className="text-center fill-viewportt"
    style={{
      position: 'fixed',
      zIndex: '9999',
      height: '100vh',
      width: '100vw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <Loader type="TailSpin" color="#5cb85c" height="60" width="60" />
  </div>
);

export default Loading;
