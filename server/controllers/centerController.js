import db from '../models';
import { uploadImage, deleteCloudImage } from '../helpers/uploadImage';

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
        if (existingCenter) {
          return res.status(409).json({
            success: false,
            message: 'Center already exists!'
          });
        }
        // if center does not exist, upload image here
        // then create it

        if (req.file) {
          uploadImage(req.file)
            .then(({ secure_url, public_id }) => {
              Center.create({
                name,
                location,
                capacity,
                price,
                isAvailable,
                userId: req.user.userId,
                imageId: public_id,
                imageUrl: secure_url
              })
                .then(center => {
                  return res.status(201).json({
                    success: true,
                    message: 'Center created succesfully!',
                    center
                  });
                })
                .catch(error => {
                  return res.status(500).json({
                    success: false,
                    message:
                      (error.errors && error.errors[0].message) ||
                      'Something went wrong, internal server error'
                  });
                });
            })
            .catch(error => {
              return res.status(400).json({
                success: false,
                message:
                  error.message ||
                  'Something went wrong, unable to upload image'
              });
            });
        } else {
          return res.status(400).json({
            success: false,
            message: 'No image file was uploaded'
          });
        }
      })
      .catch(error => {
        return res.status(500).json({
          success: false,
          message:
            'Something went wrong, internal server error' || error.message
        });
      });
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

        const name = req.body.name || center.name;
        const location = req.body.location || center.location;
        const capacity = req.body.capacity || center.capacity;
        const price = req.body.price || center.price;

        if (req.file) {
          deleteCloudImage(center.imageId)
            .then(result => {
              if (result) {
                uploadImage(req.file)
                  .then(({ secure_url, public_id }) => {
                    Center.update(
                      {
                        name,
                        location,
                        capacity,
                        price,
                        imageId: public_id,
                        imageUrl: secure_url
                      },
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
                  })
                  .catch(error => {
                    return res.status(400).json({
                      success: false,
                      message: error.message || 'Image upload failed!'
                    });
                  });
              }
            })
            .catch(error => {
              return res.status(400).json({
                success: false,
                message: error.message || 'Image upload failed!'
              });
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
  },

  /**
   * @description gets all centers
   *
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   *
   * @returns {object} list of centers
   */
  getAllCenters: (req, res) => {
    let offset = 0;
    let page = parseInt(req.query.page, 10);
    if (isNaN(page) || page < 1) page = 1;

    let limit = parseInt(req.query.limit, 10) || 12;

    if (isNaN(limit)) {
      limit = 12;
    } else if (limit > 50) {
      limit = 50;
    } else if (limit < 1) {
      limit = 1;
    }

    offset = limit * (page - 1);

    Center.findAndCountAll({
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    }).then(countedCenters => {
      const numPages = Math.ceil(countedCenters.count / limit);

      if (!countedCenters || countedCenters.count === 0) {
        return res.status(404).json({
          success: false,
          message: 'No center found!'
        });
      }

      if (countedCenters && countedCenters.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'No center on this page!'
        });
      }
      return res.status(200).json({
        success: true,
        centers: countedCenters.rows,
        page,
        numPages,
        count: countedCenters.count
      });
    });
  },

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

        const imageUrl = center.imageId;
        center
          .destroy()
          .then(() => {
            deleteCloudImage(imageUrl);

            return res.status(200).json({
              success: true,
              message: 'Event deleted succesfully'
            });
          })
          .catch(error => {
            res.status(500).json({
              success: false,
              message: error.message || "Couldn't delete center try again!"
            });
          });
      })
      .catch(error => {
        res.status(500).json({
          success: false,
          message: error.message || 'Internal server error'
        });
      });
  },

  /**
   * @description searches for a center based on the location or the name
   *
   * @param { object } req http request object
   * @param { object } res http response object
   *
   * @returns { array } list of centers
   */
  searchCenter: (req, res) => {
    const searchOptions = {
      name: req.query.name,
      location: req.query.location
    };

    const paginationOptions = {
      limit: parseInt(req.query.limit) || 10,
      page: Number(req.query.page) || 1
    };

    if (paginationOptions.limit < 1) paginationOptions.limit = 1;
    if (paginationOptions.page < 1) paginationOptions.page = 1;

    const offset = paginationOptions.limit * (paginationOptions.page - 1);

    Center.findAndCountAll({
      where: {
        $or: {
          name: { $iLike: `%${searchOptions.name}%` },
          location: { $iLike: `%${searchOptions.location}%` }
        }
      },
      limit: paginationOptions.limit,
      offset
    })
      .then(centers => {
        const numPages = Math.ceil(centers.count / paginationOptions.limit);

        if (centers.rows.length === 0) {
          return res.status(404).json({
            success: false,
            message: 'No centers found!'
          });
        }

        return res.status(200).json({
          success: true,
          message: 'Centers found!',
          page: paginationOptions.page,
          numPages,
          count: centers.count,
          centers: centers.rows
        });
      })
      .catch(error =>
        res.status(500).json({
          success: false,
          message: error.message || 'Internal server error'
        })
      );
  }
};
