/**
 * Inital state tree of the redux store
 */
export default {
  authReducer: {
    isLoading: false,
    isAuthenticated: false,
    token: localStorage.getItem('token'),
    error: null
  },
  eventsReducer: {
    isFetching: false,
    events: [],
    addingEvent: false,
  },
  centersReducer: {
    isFetching: false,
    addingCenter: false,
    // centerFetched: false,
    centers: []
    // selectedCenter: {}
    // error: false
  },
  flashMessages: {
    message: null,
    className: null
  }
};
