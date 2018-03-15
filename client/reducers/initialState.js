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
    shouldHide: true
  },
  centersReducer: {
    isFetching: false,
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
