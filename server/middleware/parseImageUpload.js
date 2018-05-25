import multer from 'multer';

const upload = multer();

/**
 * @description This middleware would attach a single file with the 
 * field name 'image' to the request object as req.file
 * 
 * @param { object } req http request object
 * @param { object } res http response object
 * 
 * @returns { object } modiied req object
 */
const parseImageUpload = (req, res) => { // eslint-disable-line
  return upload.single('image');
};

export default parseImageUpload;
