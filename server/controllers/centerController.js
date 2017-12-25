import db from '../models';

const { Center, Event } = db;
export default {

  /**
   * @description adds a new center to the database
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   * @returns {object} new center
   */
  create: (req, res) => {
    const {
      name, location, capacity, price, isAvailable
    } = req.body;

    if (!name || !location || !capacity || !price) {
      res.status(400).json({
        success: false,
        message: 'Incomplete credentials'
      });
    } else {
      return Center.create({
        name,
        location,
        capacity,
        price,
        isAvailable,
        userId: req.user.userId
      })
        .then(center => res.status(201).json({
          success: true,
          message: 'Center created succesfully!',
          center
        }))
        .catch(error => res.status(400).json({
          success: false,
          message: 'Something went wrong, unable to create center',
          error: error.message
        }));
    }
  }, // end of centerController.create


  /**
   * @description updates Center information
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   * @returns {object} updated center
   */
  update: (req, res) => {
    Center
      .findOne({
        where: {
          id: req.params.centerId
        }
      }).then((center) => {
        center.update(req.body)
          .then(updatedCenter => res.status(200).json({
            success: true,
            message: 'Center updated succesfully!',
            updatedCenter
          }));
      })
      .catch(error => res.status(500).json({
        success: false,
        message: 'Center doesnt exist',
        error: error.message
      }));
  },


  /**
   * @description gets all centers
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   * @returns {object} list of centers
   */
  getAllCenters: (req, res) => Center
    .findAll()
    .then((centers) => {
      if (!centers.length) {
        res.status(400).json({
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
    .catch(error => res.status(500).json({
      success: false,
      message: 'Could not get centers',
      error: error.message
    })),


  /**
   * @description gets a center and associated events
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   * @returns {object} center
   */
  getACenter: (req, res) => Center
    .find({
      where: { id: req.params.centerId },
      include: [
        { model: Event, as: 'events' },
      ],
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
    .catch(error => res.status(500).json({
      success: false,
      message: 'Could not get the center details',
      error: error.message
    })),
};
