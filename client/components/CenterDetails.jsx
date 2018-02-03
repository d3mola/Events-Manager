import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import { fetchSingleCenter } from '../actions/actionCreators';

class CenterDetails extends Component {

  constructor(props) {
    super(props);
    // this.handleCenterEdit = this.handleCenterEdit.bind(this);
    // this.handleCenterDelete = this.handleCenterDelete.bind(this);
  }

  // handleCenterEdit() {
      // populate edit form and toggle
  // }

  // handleCenterDelete() {

  // }

  componentDidMount() {
    this.props.fetchSingleCenter(this.props.match.params.id);
  }

  render() {
    const { selectedCenter } = this.props;
    if ( selectedCenter < 1 || !selectedCenter) {
      return (
        <p>Loading centers...</p>
      )
    } else {
      return (
      <div>
        <Header/>

        <div className="container center-details-page text-center fill-viewport mt-4">
          <div className="row">
            <div className="col col-md-12">
              <h3 className='font-weight-bold text-uppercase'>Center Details</h3>
              <div className='mt-3'>
                <p>name: <strong>{selectedCenter.name}</strong></p>
                <p>location: <strong>{selectedCenter.location}</strong></p>
                <p>price: <strong>{selectedCenter.price}</strong></p>
                <button
                  style={{ marginRight: 10 }}
                  className='btn btn-outline-primary btn-sm'
                  // onClick={handleCenterEdit}
                  >
                  <i className='fa fa-edit'></i>
                </button>
                <button
                  className='btn btn-outline-danger btn-sm'      
                  // onClick={handleCenterDelete}
                  >
                    <i className='fa fa-trash'></i>
                </button>
              </div><hr/>
              <span className="text-uppercase mt-3 font-weight-bold"><em>Events slated for {selectedCenter.name}</em></span>
              <ul className="mt-3 font-weight-bold text-uppercase">
                {selectedCenter.events.map((event, index) => (
                    <li 
                      key={index}
                      className="mb-2"
                    >{event.title} - {event.date}
                    </li>)
                  )}
              </ul>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }

  }
    // const foundCenter = centers.find((center) => center.id == match.params.id);
    
}

const mapStateToProps = (state) => ({
  selectedCenter: state.centersReducer.selectedCenter
});

export default connect(
  mapStateToProps,
  { fetchSingleCenter })(CenterDetails);