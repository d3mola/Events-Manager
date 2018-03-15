import React from 'react';
import Loader from 'react-loader-spinner';

const Loading = () => (
  <div className="text-center fill-viewportt">
    <Loader type="TailSpin" color="#5cb85c" height="50" width="50" />
  </div>
);

export default Loading;
