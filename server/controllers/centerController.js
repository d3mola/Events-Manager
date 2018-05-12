import db from '../models';

const { Center, Event } = db;
export default {
  /**
   * @description adds a new center to the database
   * 
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   * 
   * @returns {object} new center
   */
  create: (req, res) => {
    const { name, location, capacity, price, isAvailable } = req.body;
    Center.findOne({
      where: { name }
    })
      .then(existingCenter => {
        if (!existingCenter) {
          Center.create({
            name,
            location,
            capacity,
            price,
            isAvailable,
            userId: req.user.userId
          })
            .then(center =>
              res.status(201).json({
                success: true,
                message: 'Center created succesfully!',
                center
              })
            )
            .catch(error =>
              res.status(500).json({
                success: false,
                message:
                  (error.errors && error.errors[0].message) ||
                  'Something went wrong, internal server error'
              })
            );
        } else {
          res.status(409).json({
            success: false,
            message: 'Center already exists!'
          });
        }
      })
      .catch(error =>
        res.status(500).json({
          success: false,
          message:
            'Something went wrong, internal server error' || error.message
        })
      );
  }, // end of centerController.create

  /**
   * @description updates Center information
   *
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   *
   * @returns {object} response object with updated center
   */
  update: (req, res) => {
    const id = req.params.centerId;
    Center.findById(id)
      .then(center => {
        if (!center) {
          return res.status(404).json({
            success: false,
            message: 'Center doesnt exist'
          });
        }
        Center.update({
          name: req.body.name || center.name,
          location: req.body.location || center.location,
          capacity: req.body.capacity || center.capacity,
          price: req.body.price || center.price,
        }, { where: { id }, returning: true, plain: true })
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
                error.message || 'Something went wrong, internal server error'
            })
          );
      })
      .catch(error =>
        res.status(500).json({
          success: false,
          message:
            'Something went wrong, internal server error' || error.message
        })
      );
  },

  /**
   * @description gets all centers
   * 
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   * 
   * @returns {object} list of centers
   */
  getAllCenters: (req, res) =>
    Center.findAll()
      .then(centers => {
        if (!centers.length) {
          res.status(404).json({
            success: false,
            message: 'There are no centers at this time'
          });
        } else {
          res.status(200).json({
            success: true,
            centers
          });
        }
      })
      .catch(error =>
        res.status(500).json({
          success: false,
          message: 'Could not get centers',
          error: error.message
        })
      ),

  /**
   * @description gets a center and associated events
   * 
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   * 
   * @returns {object} center
   */
  getACenter: (req, res) =>
    Center.find({
      where: { id: req.params.centerId },
      include: [{ model: Event, as: 'events' }]
    })
      .then(center => {
        if (!center) {
          res.status(404).json({
            success: false,
            message: 'Center doesnt exist'
          });
        } else {
          res.status(200).json({
            success: true,
            center
          });
        }
      })
      .catch(error =>
        res.status(500).json({
          success: false,
          message: 'Could not get the center details',
          error: error.message
        })
      ),

  /**
   * @description deletes a center from the database
   * 
   * @param {object} req request object
   * @param {object} res response object
   * 
   * @return {object} deletedCenter
   */
  deleteCenter: (req, res) => {
    const id = req.params.centerId;
    Center.findById(id)
      .then(center => {
        if (!center) {
          return res.status(404).json({
            success: false,
            message: 'Center doesnt exist'
          });
        }
        Center.destroy({where: { id }}).then(
          res.status(200).send({
            success: true,
            message: 'Center deleted succesfully!'
          })
        );
      })
      .catch(error =>
        res.status(500).json({
          success: false,
          message: "Couldn't delete center try again!",
          error: error.message
        })
      );
  }
};
