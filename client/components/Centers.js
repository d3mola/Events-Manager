import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import * as actionCreators from '../actions/actionCreators';
// import centers from '../actions/actionCreators';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
/**
 * 
 * 
 * @class Centers
 * @extends {React.Component}
 */
class Centers extends React.Component {
  /**
   * Creates an instance of Centers.
   * @memberof Centers
   */
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   *  get centers as soon as component renders
   * @returns {object} centers
   * @memberof Centers
  */
  componentWillMount() {
       this.props.centers();
      // console.log('fetched centers ==>', fetchedcenters);
  }

  /**
   * 
   * @returns {object}.
   * @param {any} event
   * @memberof Centers
   */
  handleSubmit(event) {
      event.preventDefault();
      console.log(this.state)
      this.props.centers(this.state);
    } 

  /**
   * 
   * @returns {array} centers
   * @memberof Centers
   */
  renderCenters() {

    const allCenters = this.props.centers;
    console.log(allCenters);
    return allCenters.map((center) => {
      return (
        <div>
          {center.name}
        </div>
      );
    });
  }

  /**
   * 
   * @returns {object} component
   * @memberof Centers
   */
  render() {
      return (
        <div className="container">
          <h1> i came hereeeeeeeeeeeee</h1>
          { this.renderCenters() }
        </div>
  
      );
    }
  }
  
/**
 * @param {any} state 
 * @returns {object}. 
 */
function mapStateToProps(state) {
  return {
    centers: state.centers || [],
  };
}

/**
 * @param {any} dispatch 
 * @returns {object}. 
 */
function mapDispatchToProps(dispatch) {
return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Centers);
