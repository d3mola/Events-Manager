import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Configure cloudinary using preset enviroment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SERCRET
});

/**
 * @description handles async upload of images to cloudionary
 * The cloudinary.v2.uploader.upload_stream is used because
 * we are sending a buffer, which the normal cloudinary.v2.upload can't do.
 * More details at https://github.com/cloudinary/cloudinary_npm/issues/130
 *
 * @param { string } image image to be uploaded through the form
 *
 * @returns { Promise } response from cloudinary with image url
 */
export const uploadImage = image => {
  const cloudinaryOptions = {
    resource_type: 'raw',
    format: 'jpg' || 'jpeg' || 'png',
    folder: process.env.CLOUDINARY_CLOUD_FOLDER || ''
  };
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader
      .upload_stream(cloudinaryOptions, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      })
      .end(image.buffer);
  });
};

/**
 * @description deletes image from the cloud
 * 
 * @param { string } publicId image_id stored in the db
 * 
 * @returns { Promise } status from cloudinary
 */
export const deleteCloudImage = publicId => {
  const cloudinaryOptions = {
    resource_type: 'raw',
    format: 'jpg' || 'jpeg' || 'png',
    folder: process.env.CLOUDINARY_CLOUD_FOLDER || ''
  };
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader
      .destroy(publicId, cloudinaryOptions, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
    });
  });
};

