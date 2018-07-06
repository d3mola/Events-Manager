import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from 'react-responsive-modal';

import Header from '../commons/Header';
import Footer from '../commons/Footer';
import CenterDetailsComponent from '../presentationals/CenterDetailsComponent';
import { fetchSingleCenter, deleteCenter } from '../../actions/actionCreators';

export class CenterDetailsContainer extends Component {
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
   * callback to handle deletion of a center
   * passed down as props to CenterDetailsComponent
   * @param {number} id id of center to be deleted
   * @returns {Promise} deletes a center
   */
  handleCenterDelete = id => {
    this.props.deleteCenter(id);
  };

  /**
   * lifecycle method called after component mounts the DOM
   * fetches center with given id
   * @memberof CenterDetailsContainer
   * @returns {Promise} fetches the center to be rendered
   */
  componentDidMount() {
    this.props.fetchSingleCenter(this.props.match.params.id);
  }

  render() {
    const { open } = this.state;
    const { selectedCenter, match } = this.props;
    return (
      <div>
        <Header
          links={{
          centers: 'centers',
          events: 'events',
          // 'add center': 'centers/add'
          }}
        />

        <Modal
          open={open}
          onClose={this.onCloseModal}
          // center
          handleDelete={this.handleCenterDelete}
          match={match}
        >
          { selectedCenter && <h2>Delete {selectedCenter.name}</h2> }
          <p>
            Are you sure you want to delete this center? It may have unintended
            consequeces if it's currently booked by a customer!
          </p>
          <button
            className="btn btn-outline-danger btn-md"
            // onClick={() => console.log(this.props)}
            onClick={() => {
              this.setState({open: false});
              this.props.deleteCenter(match.params.id)
            }}
          >
            <i className="fa fa-trash" /> Delete
          </button>
        </Modal>

        <CenterDetailsComponent
          handleModalOpen={this.onOpenModal}
          selectedCenter={selectedCenter}
          handleDelete={this.handleCenterDelete}
          match={match}
        />
        
        <Footer />
      </div>
    );
  }
}

/**
 * maps redux state to props
 * @param {object} state redux state
 * @returns {object} props selectedCenter
 */
const mapStateToProps = state => ({
  selectedCenter: state.centersReducer.selectedCenter,
  isFetching: state.centersReducer.isFetching,
  message: state.centersReducer.message
});

CenterDetailsContainer.propTypes = {
  selectedCenter: PropTypes.object,
  fetchSingleCenter: PropTypes.func.isRequired,
  deleteCenter: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired
};

CenterDetailsContainer.defaultProps = {
  // selectedCenter: {}
};

export default connect(mapStateToProps, { fetchSingleCenter, deleteCenter })(
  CenterDetailsContainer
);
