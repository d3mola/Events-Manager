import db from '../models';
// import { uploadImage, deleteCloudImage } from '../helpers/uploadImage';

const { Center, Event } = db;

const updateCenter = (req, res, data, id) => {
  console.log(data, ">>>>>>>>>>>>>>>>>")
  Center.update(
    {
      name: data.name,
      location: data.location,
      capacity: data.capacity,
      price: data.price,
      imageId: data.imageId,
      imageUrl: data.imageId
    }
    ,
    { where: { id }, returning: true, plain: true }
  )
    .then(updatedCenterInfo =>
      res.status(200).json({
        success: true,
        message: 'Center updated succesfully!',
        updatedCenter: updatedCenterInfo[1]
      })
    )
    .catch(error =>
      res.json({
        sucess: false,
        message:
          error.message ||
          'Something went wrong, internal server error'
      })
    );
}

export default updateCenter;