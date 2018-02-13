import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Header from './Header';
import Footer from './Footer';
import { Link } from "react-router-dom";
import { getEvents } from "../actions/actionCreators";
import EventItem from "./EventItem.jsx";

class EventList extends Component {
  /**
   * Creates an instance of EventList.
   * @memberof Centers
   * @param {object} props
   */
  constructor(props) {
    super(props);
  }

  /**
   *  get events as soon as component renders
   * @returns {object} eventlist
   * @memberof EventList
   */
  componentDidMount() {
    this.props.getEvents();
  }

  render() {
    const { events, match } = this.props;
    return !events ? (
      <div>
        <em>No events...</em>
        <Link to="/events/add">
          <button className="btn btn-success">&#43;</button>
        </Link>
      </div>
    ) : (
      
    <div>
      <Header links={["centers", "events", "logout"]}/>
      <div style={{fontWeight: 'bold'}}>
        <h3>My Events</h3>
        <Link to="/events/add">
          <button className="btn btn-success btn-sm">
            <i className="fa fa-plus" />
          </button>
        </Link>
        <div>
          {events.map(event => (
            <div key={event.id}>
              <EventItem
                event={event}
                match={match}
              />
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
    );
  }
}

EventList.propTypes = {
  events: PropTypes.array.isRequired,
  getEvents: PropTypes.func.isRequired,
  // title: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  events: state.eventsReducer.events
});

export default connect(mapStateToProps, { getEvents })(EventList);
