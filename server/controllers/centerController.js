import db from '../models';

const { Center } = db;
export default {

  create: (req, res) => {
  /*  const name = req.body.name;
    const location = req.body.location;
    const capacity = req.body.capacity;
    const price = req.body.price;
    const isAvailable = req.body.isAvailable; */

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
      .then(center => res.status(201).send({
        success: true,
        message: 'Center created succesfully',
        center
      }))
      .catch(error => res.status(400).send({
        success: false,
        message: 'Something went wrong, unable to create center',
        error
      }));
  }// end of centerController.create
};// end of export default
