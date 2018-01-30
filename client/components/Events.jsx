// import React from 'react';
// import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';

// import {
//   getEvents,
//   getSingleEvent
// } from '../actions/actionCreators';
// import Header from './Header';
// import Footer from './Footer';

// // import '../../template/stylesheet/center-details.css';

// /**
//  * 
//  * @class Events
//  * @extends {React.Component}
//  */
// class Events extends React.Component {
//   /**
//    * Creates an instance of Events.
//    * @memberof Events
//    * @param {object} props
//    */
//   constructor(props) {
//     super(props);

//     this.handleGetSingleEvent = this.handleGetSingleEvent.bind(this);
//   }

//   /**
//    *  get events as soon as component renders
//    * @returns {object} events
//    * @memberof Events
//   */
//   componentDidMount() {
//     this.props.getEvents();
//       // console.log('fetched events ==>', fetchedEvents);
//     // console.log('this.state ====>', this.state, this.props);

//   }

//   handleGetSingleEvent() {
//     console.log('get single event dipatched');
//     // console.log(this.props.events);
//     console.log(this)
//     // this.props.getSingleEvent(this.state.event.id);
//   }

//   /**
//    * function where te login of our display is done so we
//    * can keep the main render function clean.
//    * we simply call the renderCenters in the render function
//    * @returns {array} centers
//    * @memberof Centers
//    */
//    renderEvents () {
//     const allEvents = this.props.events;
//     // console.log('allEvents=====>', allEvents);
//     if (!this.props.events) {
//       return (
//         <p>Loading events...</p>
//       )
//     } else {
//       return allEvents.map((event) => {
//         return (
//           <div key={event.id} className="col-12 col-md-6 text-event cards">
//             <div className="card">
//               <div className="card-header"><h4>{event.title}</h4></div>
//               <div className="card-body">
//                 {/* <h4 className="card-title">{event.image}</h4> */}
//                 {/* <img src="../static/images/Capture.png" alt="Image goes here" width="200px" height="200px" /> */}
//                 <p className="card-text">Notes: {event.notes}</p>
//                 <p className="card-text">Center: {event.centerId}</p>
//                 <p className="card-text">Event id: {event.id}</p>
//                 <p className="card-text">Date: {event.date}</p><hr />
//               </div>
//               <div className="card-footer">
//                 <Link to="#" className="btn btn-outline-success card-link" onClick={this.handleGetSingleEvent}><i className="fa fa-edit fa-sm fw"></i> Update</Link>
//                 <Link to="#" className="btn btn-outline-danger card-link"><i className="fa fa-trash fa-sm fw"></i> Delete</Link>
//               </div>
//             </div>
//           </div>
            
//         )
//       });
//     }
    
//   }

//   /**
//    * our main render function which calls the above renderCenters function
//    * and displays our data
//    * @returns {object} component
//    * @memberof Centers
//    */
//   render() {
//     // console.log('single center', this.props.centers)
//     // const renderCentersTwo = this.props.centers.map((center, index) => {
//     //   return (
//     //     <li key={index}>{center.name}</li>
//     //   )
//     // });
//     return (
//       <div className="">
//         <Header />
//         <div id="main">
//           <h3 className="text-center">Your events</h3>
//           <div className="container">
//             <div className="row fill-viewport cards">
//               { this.renderEvents() }
//             </div>
//           </div>
//         </div>
//         <Footer />
//       </div>

//     );
//   }
// }
  
// /**
//  * @param {any} state 
//  * @returns {object}. 
//  */
// const mapStateToProps = (state) => {
//   return {
//     events: state.events
//   };
// };

// /**
//  * @param {any} dispatch 
//  * @returns {object}. 
//  */
// const mapDispatchToProps = (dispatch) => {
//   return {
//     getEvents: () => dispatch(getEvents()),
//     getSingleEvent: (eventId) => dispatch(getSingleEvent(eventId))
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Events);
