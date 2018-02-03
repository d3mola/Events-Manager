import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  getEvents,
  getSingleEvent,
  deleteEvent,
  editEvent,
  showEditForm
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
      date: '',
      shouldHide: true
      // isEditing: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleToggleEditForm = this.handleToggleEditForm.bind(this);
    // this.handleClickEdit = this.handleClickEdit.bind(this)
  }

  // create CB to get data from EventDetails
  // handleClickEdit () {
  //   console.log('local state', this.state);
  // }

  handleToggleEditForm() {
    this.props.showEditForm();
  }

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
    // this.setState({shouldHide: true})
  }

  render() {
    const { events, selectEvent, currentEvent, handleDeleteEvent/*, handleEdit */} = this.props
    const disabled = !currentEvent ? true : false;// if no details is showing, disable edit-form button
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
                  // this.handleToggleEditForm;
                  this.setState({
                    title: currentEvent.title,
                    notes: currentEvent.notes,
                    center: currentEvent.centerId,
                    date: currentEvent.date,
                    eventId: currentEvent.id,
                    shouldHide: !this.props.shouldHide
                  });
                  this.props.showEditForm();
                  // this.props.shouldHide = false;
                  console.log('11111111111111111');
                  // visibility = 'none';
                }
              }
            >Edit
            </button>

            {/* <button onClick={() => this.handleToggleEditForm()}>Show Form</button> */}
          </div>
          
          <div className="col col-md-4">
            <EditEventForm
              shouldHide={this.props.shouldHide}
              data={this.state}
              visibility={this.state.visibility}
              handleClickEdit={this.handleClickEdit}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
            />
          </div>
        </div>
      </div>
    ); // return
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
    shouldHide: eventsReducer.shouldHide
  }
};

const mapDispatchToProps = (dispatch) => ({
  getEvents: () => dispatch(getEvents()),
  selectEvent: (eventId) => dispatch(getSingleEvent(eventId)),
  handleDeleteEvent: (eventId) => dispatch(deleteEvent(eventId)),
  editEvent: (eventId) => dispatch(editEvent(eventId)),
  showEditForm: () => dispatch(showEditForm())
});

export default connect(mapStateToProps, mapDispatchToProps)(EventsContainer);
