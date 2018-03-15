import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import { getCenters } from '../actions/actionCreators';
import CenterListComponent from '../views/CenterListComponent';

/**
 * this container is connected to redux store
 * and passes down props to CenterListComponent
 * @class CenterListComponent
 * @extends {React.Component}
 */
class CenterListContainer extends React.Component {
  // cold be useful in center details container
  // handleDisplayDetails = center => {
  //   console.log('cb passed down as props', center);
  //   this.props.fetchSingleCenter(center.id);
  //   console.log(this.props.match.url + '/' + center.id);
  //   // history.push(`${this.props.match.url}/${center.id}`);
  // };

  /**
   *  fetch centers as soon as component renders
   * @returns {object} centers
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
      />
    );
  }
}

CenterListContainer.propTypes = {
  centers: PropTypes.array.isRequired,
  getCenters: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  centers: state.centersReducer.centers
});

export default connect(mapStateToProps, {
  getCenters
})(CenterListContainer);
