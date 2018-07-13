import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Pagination from 'rc-pagination';
import Select from 'rc-select';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import Modal from 'react-responsive-modal';

import Header from '../commons/Header';
import Footer from '../commons/Footer';
import { getEvents, deleteEvent } from '../../actions/actionCreators';
import EventListComponent from '../presentationals/EventListComponent';

export class EventListContainer extends React.Component {
  state = {
    open: false,
    id: null
  };

  componentDidMount() {
    const parsedQueryString = queryString.parse(location.search);
    const { page, limit } = parsedQueryString;
    this.props.getEvents(page, limit);
  }

  /**
   * @description gets centers based on the param given
   *
   * @param { number } current current page number
   * @param { number } pageSize pageSize number
   *
   * @returns { array } list of events taht satisfy the param
   */
  onPageChange = (current, pageSize) => {
    this.props.getEvents(current, pageSize);
  };

  /**
   * @description gets centers when the page buttons are clicked
   *
   * @param { number } current current page number
   * @param { number } pageSize pageSize number
   *
   * @returns { array } list of events that satisfy the param
   */
  onShowSizeChange = (current, pageSize) => {
    this.props.getEvents(current, pageSize);
  };

  onOpenModal = id => {
    this.setState({ open: true, id });
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
    this.props.deleteEvent(this.state.id);
  };

  render() {
    const {
      events,
      match,
      isFetching,
      error,
      paginationData,
      onOpenModal
    } = this.props;
    return (
      <div>
        <Header
          links={{
            centers: 'centers',
            events: 'events'
          }}
        />
        <Modal
          open={this.state.open}
          onClose={this.onCloseModal}
          handleDelete={this.handleEventDelete}
          match={match}>
          <h2>Delete event{this.state.id}</h2>
          <p>Are you sure you want to delete this event?</p>
          <button
            className="btn btn-danger btn-md pull-right"
            onClick={() => {
              console.log('clicked', match);
              this.setState({ open: false });
              this.handleEventDelete(this.state.id);
            }}>
            <i className="fa fa-trash" /> Delete
          </button>
        </Modal>
        <div className="e-list-page">
          <h3>My Events</h3>
          <div className="e-list fill-viewport">
            <EventListComponent
              events={events}
              match={match}
              isFetching={isFetching}
              error={error}
              handleModalOpen={this.onOpenModal}
              handleDelete={this.handleEventDelete}
            />
          </div>

          <Pagination
            style={{ display: 'flex', justifyContent: 'center' }}
            current={paginationData.page}
            total={paginationData.count}
            defaultPageSize={9}
            pageSize={9}
            onChange={this.onPageChange}
            selectComponentClass={Select}
            showQuickJumper
            showSizeChanger
            onShowSizeChange={this.onShowSizeChange}
            locale={{ items_per_page: 'Items', skip: 'Goto' }}
            className="custom-pagination"
          />
        </div>
        <Link to="/events/add" className="float">
          <i className="fa fa-plus my-float" />
          <span>add event</span>
        </Link>
        <Footer />
      </div>
    );
  }
}

EventListContainer.propTypes = {
  events: PropTypes.array.isRequired,
  getEvents: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string,
  paginationData: PropTypes.object,
  onOpenModal: PropTypes.func,
  deleteEvent: PropTypes.func
};

const mapStateToProps = state => ({
  events: state.eventsReducer.events,
  isFetching: state.eventsReducer.isFetching,
  error: state.eventsReducer.error,
  paginationData: state.centersReducer.paginationData
});

export default connect(
  mapStateToProps,
  {
    getEvents,
    deleteEvent
  }
)(EventListContainer);
