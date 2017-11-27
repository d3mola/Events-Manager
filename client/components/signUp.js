import React from 'react';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../template/stylesheet/style.css';

export default class SignUpForm extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto">
              <form id="form-box" className="jumbotron" action="" method="post">
                <h2 className="text-center">Register!</h2>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input className="form-control" type="text" name="username" id="username" placeholder="johndoe" />                  
                </div>
                
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input className="form-control" type="email" name="email" id="email" placeholder="johndoe@email.com" />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input className="form-control" type="password" name="password" id="password" placeholder="Enter your password" />                  
                </div>

                <div className="form-group">
                    <label htmlFor="confirm-passwrod">Password again:</label>
                    <input className="form-control" type="password" name="confirm-password" id="confirm-password" placeholder="Enter your password again" />                  
                </div>
                <input className="btn btn-outline-success" type="submit" value="Register" />
                <br />
                <p className="text-center">Already have an account yet? <a href="login.html">Login</a></p>
              </form>
          </div>
        </div>
      </div>
    );
  }
};
