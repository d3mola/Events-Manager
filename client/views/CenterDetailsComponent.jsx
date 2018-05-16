import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Loading from '../components/Loading';

const CenterDetailsComponent = props => {
  const { selectedCenter, match, handleDelete, isFetching } = props;
  console.log(selectedCenter, '-----');
  if (isFetching) {
    return <Loading />;
  } else {
    if (!selectedCenter) {
      return <h3 className="fill-viewport">This center does not exist</h3>;
    } else {
      return (
        <div className="row text-center">
          <div className="col col-md-12">
            <h3 className="font-weight-bold text-uppercase mt-3">
              Center Details
            </h3>
            <div className="mt-3">
              <p>
                name: <strong>{selectedCenter.name}</strong>
              </p>
              <p>
                location: <strong>{selectedCenter.location}</strong>
              </p>
              <p>
                price: <strong>{selectedCenter.price}</strong>
              </p>
              <Link
                to={match.url + '/edit'}
                style={{ marginRight: 10 }}
                className="btn btn-outline-primary btn-sm"
              >
                <i className="fa fa-edit" />
              </Link>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => handleDelete(match.params.id)}
              >
                <i className="fa fa-trash" />
              </button>
            </div>
            <hr />
            <span className="text-uppercase mt-3 font-weight-bold">
              <em>Events slated for {selectedCenter.name}</em>
            </span>
            {selectedCenter.events.length ? (
              <ul className="mt-3 font-weight-bold text-uppercase">
                {selectedCenter.events.map((event, index) => (
                  <li key={index} className="mb-2">
                    {event.title} - {event.date}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No event is scheduled for this center</p>
            )}
          </div>
        </div>
      );
    }
  }

  // if (!selectedCenter || selectedCenter.length < 1) {
  //   return <Loading />;
  // } else {
  //   return (
  //     <div className="container center-details-page fill-viewport mt-4">
  //       <div className="row text-center">
  //         <div className="col col-md-12">
  //           <h3 className="font-weight-bold text-uppercase mt-3">
  //             Center Details
  //           </h3>
  //           <div className="mt-3">
  //             <p>
  //               name: <strong>{selectedCenter.name}</strong>
  //             </p>
  //             <p>
  //               location: <strong>{selectedCenter.location}</strong>
  //             </p>
  //             <p>
  //               price: <strong>{selectedCenter.price}</strong>
  //             </p>
  //             <Link
  //               to={match.url + '/edit'}
  //               style={{ marginRight: 10 }}
  //               className="btn btn-outline-primary btn-sm"
  //             >
  //               <i className="fa fa-edit" />
  //             </Link>
  //             <button
  //               className="btn btn-outline-danger btn-sm"
  //               onClick={() => handleDelete(match.params.id)}
  //             >
  //               <i className="fa fa-trash" />
  //             </button>
  //           </div>
  //           <hr />
  //           <span className="text-uppercase mt-3 font-weight-bold">
  //             <em>Events slated for {selectedCenter.name}</em>
  //           </span>
  //           {selectedCenter.events.length ? (
  //             <ul className="mt-3 font-weight-bold text-uppercase">
  //               {selectedCenter.events.map((event, index) => (
  //                 <li key={index} className="mb-2">
  //                   {event.title} - {event.date}
  //                 </li>
  //               ))}
  //             </ul>
  //           ) : (
  //             console.log('here')||
  //             <p>No event is scheduled for this center</p>
  //           )}
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }
};

CenterDetailsComponent.propTypes = {
  selectedCenter: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired
};

CenterDetailsComponent.defaultProps = {
  // selectedCenter: {}
};

export default CenterDetailsComponent;
