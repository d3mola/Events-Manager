/**
 *
 * @param {*} state
 * @param {*} action
 * @returns {array} states
 */
const centers = ((state = [], action) => {
  switch (action.type) {
    case 'GET_CENTERS_SUCCESS':
    return [...state, action.response.centers];
  case 'ADD_CENTER_SUCCESS':
    console.log('Reducer==> center succesfully added');
    return Object.assign({}, state, { centers: action.response });
  default:
    return state;
  }
});

export default centers;

