import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CenterDetailsComponent from '../views/CenterDetailsComponent';
import { fetchSingleCenter, deleteCenter } from '../actions/actionCreators';

export class CenterDetailsContainer extends Component {
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
    const { selectedCenter, match } = this.props;
    return (
      <CenterDetailsComponent
        selectedCenter={selectedCenter}
        handleDelete={this.handleCenterDelete}
        match={match}
      />
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
  isFetching: state.centersReducer.isFetching
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
