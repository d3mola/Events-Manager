/**
 *
 * @param {*} state
 * @param {*} action
 * @returns {array} state
 */
const centers = ((state = [], action) => {
  switch (action.type) {

    case 'GET_CENTERS_SUCCESS':
      console.log('Reducer==> get centers successfull', action.response.centers);
      return [...action.response.centers];

    case 'ADD_CENTER_SUCCESS':
      console.log('Reducer==> center succesfully added', action.response);
      // return Object.assign({}, state, { center: action.response.center });
      return [...state, action.response.center];

    case 'ADD_CENTER_FAILED':
      return state;
      
    default:
      return state;
  }
});

export default centers;

