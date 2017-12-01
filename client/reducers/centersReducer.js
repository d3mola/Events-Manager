/**
 *
 * @param {*} state
 * @param {*} action
 * @returns {array} states
 */
function Centers(state = [], action) {
  switch (action.type) {
    case 'GET_CENTERS_SUCCESS':
      console.log('SUCCESS!!!=====>', action.response);
      // return [...state, action.centers];
      return Object.assign({}, state, { centers: action.response });
      // return action.response;
    default:
      return state;
  }
}

export default Centers;
