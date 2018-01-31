import React from 'react'
import PropTypes from 'prop-types';
import EventItem from './EventItem.jsx';
import { Link } from 'react-router-dom';

// original implemenation using children props
// no mapping here
// const EventList = ({ title, children }) => (
//   <div>
//     <h3><strong><em>{title}</em></strong></h3>
//     <div>{children}</div>
//   </div>
// )

// trial implementayion without children props
// mapping here
const EventList = ({ events, selectEvent, handleDeleteEvent }) => (
  
  !events ?
  (
    <div>
      <em>No events...</em>
      <Link to='/add-event'><button className='btn btn-success'>&#43;</button></Link>
    </div>
  ) :
  <div>
    <h3>My Events</h3>
    <Link to='/add-event'><button className='btn btn-success btn-sm'><i className="fa fa-plus"></i></button></Link>
    {/* <Link to='/add-event'><button className='btn btn-success'>&#43;</button></Link> */}
    <div>
      {
        events.map(event => (
          <div key={event.id}>
            <EventItem
              // key={event.id}
              event={event}
              onCurrentEventClicked={() => selectEvent(event.id)}
              handleDeleteEvent={() => handleDeleteEvent(event.id)}
            />

            {/* alternative implementation of delete without going a component deeper */}
            {/* <button onClick={() => handleDeleteEvent(event.id)}>X </button> */}
          </div>
        ))}
    </div>
  </div>
)

// EventList.propTypes = {
//   children: PropTypes.node,
//   title: PropTypes.string.isRequired
// }

export default EventList
