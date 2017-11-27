import React from 'react';
import ReactDOM from 'react-dom';
import SignupForm from './components/signUp'

class App extends React.Component {
  render() {
    return (
      <SignupForm />
    );
  }// render
}// component

ReactDOM.render(<App />, document.getElementById('app'));
