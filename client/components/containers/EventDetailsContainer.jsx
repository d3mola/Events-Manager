import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from 'react-responsive-modal';

import Header from '../commons/Header';
import Footer from '../commons/Footer';
import EventDetailsComponent from '../presentationals/EventDetailsComponent';
import { getSingleEvent, deleteEvent } from '../../actions/actionCreators';

export class EventDetailsContainer extends Component {
  state = {
    open: false
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  /**
   * callback to handle deletion of an event
   * passed down as props to component
   * @param {number} id id of center to be deleted
   * @returns {Promise} deletes a center
   */
  handleEventDelete = id => {
    this.props.deleteEvent(id);
  };

  /**
   * lifecycle method called after component mounts the DOM
   * fetches center with given id
   * @memberof CenterDetailsContainer
   * @returns {Promise} fetches the center to be rendered
   */
  componentDidMount() {
    this.props.getSingleEvent(this.props.match.params.id);
  }

  render() {
    const { open } = this.state;
    const { currentEvent, match, isFetching } = this.props;
    return (
      <div>
        <Header
          links={{
            centers: 'centers',
            events: 'events'
          }}
        />
        <Modal
          open={open}
          onClose={this.onCloseModal}
          // center
          handleDelete={this.handleEventDelete}
          match={match}>
          {currentEvent && <h2>Delete {currentEvent.title}</h2>}
          <p>Are you sure you want to delete this event?</p>
          <button
            className="btn btn-outline-danger btn-md"
            // onClick={() => console.log(this.props)}
            onClick={() => {
              this.setState({ open: false });
              this.props.deleteEvent(match.params.id);
            }}>
            <i className="fa fa-trash" /> Delete
          </button>
        </Modal>
        <EventDetailsComponent
          currentEvent={currentEvent}
          handleDelete={this.handleEventDelete}
          match={match}
          isFetching={isFetching}
          handleModalOpen={this.onOpenModal}
        />
        <Footer />
      </div>
    );
  }
}

/**
 * maps redux state to props
 * @param {object} state redux state
 * @returns {object} props currentEvent
 */
const mapStateToProps = state => ({
  currentEvent: state.eventsReducer.currentEvent,
  isFetching: state.eventsReducer.isFetching
});

EventDetailsContainer.propTypes = {
  currentEvent: PropTypes.object,
  getSingleEvent: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired
};

EventDetailsContainer.defaultProps = {
  // currentEvent: {}
};

export default connect(
  mapStateToProps,
  { getSingleEvent, deleteEvent }
)(EventDetailsContainer);
