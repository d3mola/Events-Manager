import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import * as actionCreators from '../actions/actionCreators';
import { addEvent } from '../actions/actionCreators';
import Header from './Header';
import Footer from './Footer';
import "../../template/stylesheet/events.css";

/**
 * Creates AddEvent Component
 */
class AddEvent extends Component {

  constructor(props) {
    super(props);
    // console.log(props);

    this.state = {
      title: '',
      notes: '',
      center: '',
      date: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    console.log('mounted====> ', this.state);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
    // console.log(this.state);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.addEvent(this.state);
    // something should happen here - dispatch an action on submit
    this.setState({
      title: '',
      notes: '',
      center: '',
      date: ''
    });
  }

  render() {
    return (
      <div id="form">
        <Header />
        <div className="container">
          <div className="row fill-viewport">
            <div className="col col-md-8">
                <form id="form-box" action="" method="post" onSubmit={this.handleSubmit}>
                  <h2 className="text-center">Create An Event!</h2>
                  <div className="form-group">
                      <label htmlFor="event-name">Event Name:</label>
                      <input className="form-control" type="text" name="title" id="event-name" placeholder="E.g. John's convocation" value={this.state.title} onChange={this.handleChange} />                  
                  </div>
                  <div>
                    <label htmlFor="notes">Optional Note:</label>
                    <textarea className="form-control" name="notes" id="notes" cols="50" rows="4" placeholder="Enter an optional note"  value={this.state.notes} onChange={this.handleChange}></textarea>
                  </div>
                  <br />
                  <div className="form-group">
                    <label htmlFor="center">Event Center: </label>
                    <select className="form-control" name="center" id="center" value={this.state.center} onChange={this.handleChange}>
                      <option value="1" title="Oluyole, Ibadan">First hall</option>
                      <option value="2" title="Banana Island">Emerald hall</option>
                      <option value="3" title="Ketu">Sapphire</option>
                      <option value="4" title="Ikoyi">Gold</option>
                      <option value="5" title="Oluyole, Ibadan">Silver hall</option>
                      <option value="6" title="Victoria Island Lagos">Ruby Hall</option>
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
        <Footer />
      </div>
  );
  }
}

// const mapStateToProps = (state) => 

const mapDispatchToProps = (dispatch) => {
  return {
    addEvent: (event) => dispatch(addEvent(event))
  }
}

export default connect(null, mapDispatchToProps)(AddEvent);