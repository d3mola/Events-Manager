import db from '../models';

const { Event } = db;

export default {

  /**
   * @description adds a new center to the database
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   * @returns {object} new event
   */
  createEvent: (req, res) => {
    const {
      title, notes, centerId, date
    } = req.body;

    // check if the user fills the required fields
    if (!centerId || !title || !date) {
      res.status(401).json({
        success: false,
        message: 'Incomplete credentials'
      });
    }
    // check if date is already taken
    return Event.find({
      where: {
        centerId,
        date
      }
    }).then((originalEvent) => {
      // if the event is taken send an error
      if (originalEvent) {
        res.status(404).json({
          success: false,
          message: 'This date is not available'
        });
        // else create the event
      } else {
        Event.create({
          title,
          notes,
          centerId,
          date,
          userId: req.user.id
        })
          .then(event => res.status(201).json({
            success: true,
            message: 'Event created succesfully!',
            event
          }))
          .catch(error => res.status(403).json({
            success: false,
            message: 'Center doesnt exist',
            error: error.toString()
          }));
      }
    }).catch(error => res.status(500).json({
      success: false,
      message: 'Invalid input',
      error: error.toString()
    }));
  },
};
