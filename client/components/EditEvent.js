import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { editEvent, getEvents } from '../actions/actionCreators';

import Header from './Header';
// import EventForm from './AddEvent';
import Footer from './Footer';
import "../../template/stylesheet/events.css";


class EditEvent extends Component {

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
    this.handleGetEvents = this.handleGetEvents.bind(this);
    // this.getSingleEvent = this.getSingleEvent.bind(this);
  }

  // componentWillReceiveProps(newProps) {

  // }

  // componentDidMount() {
  //   console.log('mounted====> ', this.state);
  //   this.props.getEvents();
  // }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
    // console.log(this.state);
  }

  handleGetEvents() {
    this.props.getEvents();
    console.log('button clicked');
    console.log(this.state);
    // this.setState({
    //   title: 'helloooo',
    //   notes: event.notes
    // });
    console.log(this.state);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('props before submit', this.props);
  this.props.editEvent(this.state);
    console.log('props after submit', this.props);
  }

  // getSingleEvent(event) {
  //   // e.preventDefault();
  //   console.log('---------', event);
  //   //()=> console.log(event.id)
  // }

  renderEvents() {
    const allEvents = this.props.events;
    console.log('all events', allEvents);
    if (!this.props.events) {
      return (
        <p>Loading events...</p>
      )
    } else {
      return allEvents.map((event,index) => {
        return (
          <li 
          key={index}  
          onClick={(e) => {
            console.log(event);
            this.setState({
              title: event.title,
              notes: event.notes,
              center: event.center,
              date: event.date,
              eventId: event.id
            });
            console.log(e.target.value);
            console.log(this.state)
          }}
          >
          {event.title} - {event.id}
          </li>
        )
      });
    }
  }

  render() {
    return (
      <div>
        <Header/>
        <div className="container">
          <div className="row fill-viewport">
            <div className="col col-md-8">
                <form id="form-box" action="" method="post" onSubmit={this.handleSubmit}>
                  <h2 className="text-center">Edit Event!</h2>
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
          </div>
        </div>
        <ul>
          {this.renderEvents()}
        </ul>
        <button onClick={this.handleGetEvents}>get events</button>
        <Footer/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return{
    events: state.events
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    editEvent: (event) => dispatch(editEvent(event)),
    getEvents: () => dispatch(getEvents())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditEvent);