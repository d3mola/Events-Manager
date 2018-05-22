/**
 * @description Trims all white space in the request body
 * 
 * @param { object } reqBody http request body
 * @returns { object } stripped req.body
 */
export const stripRequestBody = (reqBody) => {
  const inputFields = Object.keys(reqBody);
  inputFields.forEach((key) => {
      reqBody[key] = reqBody[key].replace(/\s/g, "");
  });

  return reqBody;
}

/**
 * @description Trims white space at the start and end of the request body
 * 
 * @param { object } reqBody http request body
 * @returns { object } trimmed req.body
 */
export const trimRequestBody = (reqBody) => {
  const inputFields = Object.keys(reqBody);
  inputFields.forEach((key) => {
      reqBody[key] = reqBody[key].trim();
  });

  return reqBody; 
}

export const isAWord = str => /[a-zA-Z]/.test(str);

export const isDoubleSpaced = str => /(\s){2}/.test(str)