/**
 * Inital state tree of the redux store
 */
export default {
  authReducer: {
    isLoading: false,
    isAuthenticated: false,
    token: localStorage.getItem('token'),
    error: null,
    user: localStorage.getItem('user'),
    isAdmin: localStorage.getItem('isAdmin')
  },
  eventsReducer: {
    isFetching: false,
    events: [],
    addingEvent: false,
    paginationData: {},
    error: null
  },
  centersReducer: {
    isFetching: false,
    addingCenter: false,
    editingCenter: false,
    centers: [],
    paginationData: {},
    selectedCenter: {},
    error: null
  },
  flashMessages: {
    message: null,
    className: null
  }
};
