/**
 * Set the url of the api that the client makes request to
 * depending on the node environment
 * @param {string} nodeEnv node environment
 * @returns {string} url of api
 */
const setApiUrl = nodeEnv => {
  if (nodeEnv === 'development' || nodeEnv === 'test') {
    return 'http://localhost:8000/api/v1';
  }
  if (nodeEnv === 'production') return 'https://party-palace.herokuapp.com/api/v1';
};

export default setApiUrl;
