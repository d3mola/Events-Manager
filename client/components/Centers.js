import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import { getCenters } from '../actions/actionCreators';
import Header from './Header';
import Footer from './Footer';

/**
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
    this.props.getCenters();
  }

  /**
   * function where te login of our display is done so we
   * can keep the main render function clean.
   * we simply call the renderCenters in the render function
   * @returns {array} centers
   * @memberof Centers
   */
  renderCenters() {
    const allCenters = this.props.centers;
    if (!this.props.centers) {
      return (
        <p>Loading centers...</p>
      )
    } else {
      return (
        <div className="row fill-viewport">{allCenters.map((center, index) => (
          <div className="col-md-4 text-center" key={index}>
            <div className="card">
              <div className="card-header"><h4>{center.name}</h4></div>
              <div className="card-body">
                {/* <h4 className="card-title">{center.image}</h4> */}
                <img src="../static/images/Capture.png" alt="Image goes here" width="200px" height="200px" />
                <p className="card-text">Location: {center.location.toUpperCase()}</p>
                <p className="card-text">Capacity: {center.capacity}</p>
                <p className="card-text">Price: {'#' + center.price}</p><hr />
              </div>
              <div className="card-footerr">
                <Link
                  to={`${this.props.match.url}/${center.id}`}
                  className="btn btn-success mb-2"
                ><i className="fa fa-info fa-sm fw"></i> Details
                  </Link>
              </div>
            </div>
          </div>
        ))}
        </div>
      );
    }
  }

  /**
   * our main render function which calls the above renderCenters function
   * and displays our data
   * @returns {object} component
   * @memberof Centers
   */
  render() {
    return (
      <div className="">
        <Header
          links={["centers", "events", "logout"]}
        />
        <div id="main">
          <h3 className="text-center">These are the available centers</h3>
          <div className="container">
            <div className="fill-viewport cards">
              {this.renderCenters()}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
    centers: state.centersReducer.centers,
});

export default connect(
  mapStateToProps,
  { getCenters }
)(Centers);