import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCenters } from '../actions/actionCreators';
import CenterListComponent from '../views/CenterListComponent';

/**
 * this container is connected to redux store
 * and passes down props to CenterListComponent
 * @class CenterListComponent
 * @extends {React.Component}
 */
class CenterListContainer extends React.Component {

  /**
   *  fetch centers as soon as component renders
   * @returns {array} list of centers
   * @memberof Centers
   */
  componentDidMount() {
    this.props.getCenters();
  }

  /**
   * main render function
   * @returns {jsx} jsx representation of component
   * @memberof Centers
   */
  render() {
    return (
      <CenterListComponent
        centers={this.props.centers}
        match={this.props.match}
        isFetching={this.props.isFetching}
      />
    );
  }
}

CenterListContainer.propTypes = {
  centers: PropTypes.array.isRequired,
  getCenters: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  centers: state.centersReducer.centers,
  isFetching: state.centersReducer.isFetching
});

export default connect(mapStateToProps, {
  getCenters
})(CenterListContainer);
