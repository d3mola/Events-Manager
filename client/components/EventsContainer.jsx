import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  getEvents,
  getSingleEvent,
  deleteEvent,
  editEvent
} from '../actions/actionCreators';

import EventList from './EventList.jsx';
import EventDetails from './EventDetails.jsx';
import EventItem from './EventItem.jsx';
import EditEventForm from './EditEventForm.jsx';

// this Container page shows several components

class EventsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      notes: '',
      center: '',
      date: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleClickEdit = this.handleClickEdit.bind(this)
  }

  // create CB to get data from EventDetails
  // handleClickEdit () {
  //   console.log('local state', this.state);
  // }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
  this.props.editEvent(this.state);
  }

  componentDidMount() {
    this.props.getEvents();
  }

  render() {
    const { events, selectEvent, currentEvent, handleDeleteEvent/*, handleEdit */} = this.props
    const disabled = !currentEvent ? true : false;
    return (
      <div className="container-fluid" style={{paddingTop:20, marginBottom:30}}>
        <div className="row fill-viewport">
          <div className="col-6 col-md-4">
            {/* <Link to='/add-event'><button className='btn btn-success'>&#43;</button></Link> */}
            <EventList
              events={events}
              selectEvent={selectEvent}
              handleDeleteEvent={handleDeleteEvent}
            />
          </div>
          <div className="col-6 col-md-4" style={{marginBottom:30}}>
            <EventDetails
              currentEvent={currentEvent}
              // handleEdit={handleEdit}
            />

            <button
              disabled={disabled}
              className='btn btn-success'
              style={{marginTop:20}}
              onClick={
                () => {
                  this.setState({
                    title: currentEvent.title,
                    notes: currentEvent.notes,
                    center: currentEvent.centerId,
                    date: currentEvent.date,
                    eventId: currentEvent.id
                  });
                }
              }
            >Edit
            </button>
          </div>
          
          <div className="col col-md-4">
            <EditEventForm
              data={this.state}
              handleClickEdit={this.handleClickEdit}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
            />
          </div>
        </div>
      </div>
    );
  }
}

// EventsContainer.propTypes = {
//   events: PropTypes.array.isRequired,
//   getEvents: PropTypes.func.isRequired,
//   selectEvent: PropTypes.func.isRequired,
// };

const mapStateToProps = ({ eventsReducer }) => {
  // console.log('state.eventsReducer------------', eventsReducer);
  return {
    events: eventsReducer.events,
    currentEvent: eventsReducer.currentEvent,
  }
};

const mapDispatchToProps = (dispatch) => ({
  getEvents: () => dispatch(getEvents()),
  selectEvent: (eventId) => dispatch(getSingleEvent(eventId)),
  handleDeleteEvent: (eventId) => dispatch(deleteEvent(eventId)),
  editEvent: (eventId) => dispatch(editEvent(eventId)),  
});

export default connect(mapStateToProps, mapDispatchToProps)(EventsContainer);
