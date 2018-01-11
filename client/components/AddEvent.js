import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Header from './Header';
import "../../template/stylesheet/events.css";

/**
 * Creates AddEvent Component
 */
class AddEvent extends Component {

  constructor(props) {
    super(props);
    // console.log(props);

    this.state = {
      name: '',
      description: '',
      center: '',
      date: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(this.state);
  }

  handleSubmit(e) {
    e.preventDefault();
    alert('event handler');
    // something should happen here - dispatch an action on submit
  }

  render() {
    return (
      <div id="form">
        <div className="container">
          <div className="row fill-viewport">
            <div className="col col-md-8">
                <form id="form-box" action="" method="post" onSubmit={this.handleSubmit}>
                  <h2 className="text-center">Create An Event!</h2>
                  <div className="form-group">
                      <label htmlFor="event-name">Event Name:</label>
                      <input className="form-control" type="text" name="name" id="event-name" placeholder="E.g. John's convocation" value={this.state.name} onChange={this.handleChange} />                  
                  </div>
                  <div>
                    <label htmlFor="">Optional Note:</label>
                    <textarea className="form-control" name="description" id="description" cols="50" rows="4" placeholder="Enter an optional note"  value={this.state.description} onChange={this.handleChange}></textarea>
                  </div>
                  <br />
                  <div className="form-group">
                    <label htmlFor="">Event Center: </label>
                    <select className="form-control" name="center" id="center" value={this.state.center} onChange={this.handleChange}>
                      <option value="rubyhall" title="Victoria Island Lagos">Ruby Hall</option>
                      <option value="emeraldhall" title="Banana Island">Emerald hall</option>
                      <option value="sapphore" title="Ketu">Sapphire</option>
                      <option value="gold" title="Ikoyi">Gold</option>
                      <option value="silver" title="Oluyole, Ibadan">Silver hall</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="date">Choose a date and time:<br />MM/DD/YYYY</label>
                    <input className="form-control" type="date" name="date" id="date" value={this.state.date} onChange={this.handleChange}/>
                  </div>
                  
                  <input className="btn btn-outline-success" type="submit" value="Schedule"/>
                </form>
            </div>
            <div className="col-md-4 text-center">
              <h2>Event History</h2>
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Jane's Aniversaary</h4>
                  <p className="card-text">Some example text. Some example text.</p>
                  <a to="#" className="btn card-link"><i className="fa fa-edit fa-lg fw"></i> Update</a>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Ade's Wedding</h4>
                  <p className="card-text">Some example text. Some example text.</p>
                  <a to="#" className="btn btn-dark card-link"><i className="fa fa-edit fa-lg fw"></i> Update</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
  }
}

export default AddEvent;