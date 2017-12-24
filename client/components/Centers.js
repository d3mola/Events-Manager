import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { centers } from '../actions/actionCreators';
import Header from './SignupHeader';

import '../../template/stylesheet/center-details.css';

/**
 * 
 * @class Centers
 * @extends {React.Component}
 */
class Centers extends React.Component {
  /**
   * Creates an instance of Centers.
   * @memberof Centers
   * @param {object} props
   */
  constructor(props) {
    super(props);
  }

  /**
   *  get centers as soon as component renders
   * @returns {object} centers
   * @memberof Centers
  */
  componentDidMount() {
    this.props.actions();
      // console.log('fetched centers ==>', fetchedcenters);
  }

  /**
   * function where te login of our display is done so we
   * can keep the main render function clean.
   * we simply call the renderCenters in the render function
   * @returns {array} centers
   * @memberof Centers
   */
   renderCenters () {
    const allCenters = this.props.centers;
    console.log('allCenters=====>', allCenters);
    if (!this.props.centers) {
      return (
        <p>Loading centers...</p>
      )
    } else {
      return allCenters.map((center, index) => {
        return (
          <div key={index} className="col-12 col-md-6 text-center">
            <div className="card">
              <div className="card-body">
                <p>These are the available</p>
                <h4 className="card-title">{center.name}</h4>
                <p className="card-text">{center.location}</p>
                <p className="card-text">{center.capacity}</p>
                <p className="card-text">{'#'+center.price}</p><hr />
                <a href="#" className="btn card-link"><i className="fa fa-edit fa-lg fw"></i> Update</a>
              </div>
            </div>
          </div>
            
        )
      });
    }
    
  }

  /**
   * our main render function which calls the above renderCenters function
   * and displays our data
   * @returns {object} component
   * @memberof Centers
   */
  render() {
    // console.log('single center', this.props.centers)
    // const renderCentersTwo = this.props.centers.map((center, index) => {
    //   return (
    //     <li key={index}>{center.name}</li>
    //   )
    // });
    return (
      <div className="container">
        <Header />
        <section id="main">
            <div className="container">
              <div className="row fill-viewport">
                { this.renderCenters() }
              </div>
            </div>
        </section>
          
      </div>

    );
  }
}
  
/**
 * @param {any} state 
 * @returns {object}. 
 */
const mapStateToProps = (state) => {
  return {
    centers: state.centers
  };
};

/**
 * @param {any} dispatch 
 * @returns {object}. 
 */
const mapDispatchToProps = (dispatch) => {
  return {
    actions: () => dispatch(centers())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Centers);
