import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { centers } from '../actions/actionCreators';
import Header from './Header';
import Footer from './Footer';

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
          <div key={index} className="col-12 col-md-6 text-center cards">
            <div className="card">
              <div className="card-header"><h4>{center.name}</h4></div>
              <div className="card-body">
                {/* <h4 className="card-title">{center.image}</h4> */}
                <img src="../static/images/Capture.png" alt="Image goes here" width="200px" height="200px" />
                <p className="card-text">Location: {center.location.toUpperCase()}</p>
                <p className="card-text">Capacity: {center.capacity}</p>
                <p className="card-text">Price: {'#'+center.price}</p><hr />
              </div>
              <div className="card-footer">
                <a href="#" className="btn btn-outline-success card-link"><i className="fa fa-edit fa-sm fw"></i> Update</a>
                <a href="#" className="btn btn-outline-success card-link"><i className="fa fa-info fa-sm fw"></i> Details</a>
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
      <div className="">
        <Header />
        <div id="main">
          <h3 className="text-center">These are the available centers</h3>
          <div className="container">
            <div className="row fill-viewport cards">
              { this.renderCenters() }
            </div>
          </div>
        </div>
        <Footer />
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
