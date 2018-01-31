import React, { Component } from 'react';
import PropTypes from 'prop-types';

// single event either clicked or navigated to through the url id
const EventDetails = ({ currentEvent/*, handleEdit */}) => {
  // const { currentEvent } = props;
  // console.log('props from event info', props);
  // const disabled = !currentEvent ? true : false;
  if (!currentEvent) {
    return (
      <div>
        <h3>Details of the clicked event</h3>
        <em>Click an event to see the details!</em>
      </div>
    )
  } else {
    return (
      <div>
        <h3>Event Details</h3><hr/>
        <p>title - <strong>{currentEvent.title}</strong></p><hr/>
        <p>id - {currentEvent.id}</p><hr/>
        <p>notes - {currentEvent.notes}</p><hr/>
        <p>center id - {currentEvent.centerId}</p>
        {/* <button>Edit</button> */}
        {/* <button
          onClick={
            () => {
              console.log('edit', currentEvent, handleClickEdit());
              // call thr call CB
              // handleClickEdit
            }
          }
        >
        Edit</button> */}
      </div>
    );

  }
}

EventDetails.props = {
  currentEvent: PropTypes.number.isRequired,
}

export default EventDetails;
