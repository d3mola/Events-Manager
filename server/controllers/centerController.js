import db from '../models';

const { Center } = db;
export default {

  create: (req, res) => {
    const {
      name, location, capacity, price, isAvailable
    } = req.body;

    return Center.create({
      name,
      location,
      capacity,
      price,
      isAvailable
    })
      .then(center => res.status(201).json({
        success: true,
        message: 'Center created succesfully!',
        center
      }))
      .catch(error => res.status(400).json({
        success: false,
        message: 'Something went wrong, unable to create center',
        error
      }));
  }// end of centerController.create
};// end of export default
