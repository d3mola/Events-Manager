/** 
 * Inital state tree of the redux store
 */
export default {
  eventsReducer: {
    fetchingEvents: false,
    events: [],
    shouldHide: true
  },
  centersReducer: {
    fetchingCenters: false,
    centers: [],
  },
  flashMessages: {
    message: null,
    className: null
  }
}