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
    })
      .then((originalEvent) => {
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
            userId: req.user.userId
          })
            .then(event => res.status(201).json({
              success: true,
              message: 'Event created succesfully!',
              event
            }))
            .catch(error => res.status(403).json({
              success: false,
              message: 'Center doesnt exist',
              error: error.message
            }));
        }
      })
      .catch(error => res.status(500).json({
        success: false,
        message: 'Invalid input',
        error: error.message
      }));
  },


  /**
   * @description updates an event
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   * @returns {object} new event
   */
  updateEvent: (req, res) => {
    const {
      title, centerId, date
    } = req.body;

    // check if the user fills the required fields
    if (!centerId || !title || !date) {
      res.status(401).json({
        success: false,
        message: 'Incomplete credentials'
      });
    } else {
      Event.find({
        where: {
          centerId,
          date
        }
      })
        .then((existingEvent) => {
          if (existingEvent) {
            res.status(404).json({
              success: false,
              message: 'This date is not available'
            });
          } else {
            Event
              .findOne({
                where: {
                  id: req.params.eventId
                }
              }).then((event) => {
                event.update(req.body)
                  .then(updatedEvent => res.status(200).json({
                    success: true,
                    message: 'Center updated succesfully!',
                    updatedEvent
                  }));
              });
          }// end of else
        }).catch(error => res.status(400).json({
          success: false,
          message: 'Could not update event',
          error: error.message
        }));
    }// end of else
  }, // update end

  /**
   * @description deletes an event
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   * @returns {object} message
   */
  deleteEvent: (req, res) => {
    /**
     * look for the event by param, then, if the event doesnt exist, throw err
     * else look for the center associted with the event and set the isavailble status to false
     * then destroy
     */
    const id = req.params.eventId;
    Event.findById(id)
      .then((event) => {
        if (!event) {
          res.status(400).json({
            success: false,
            message: 'Event does not exist'
          });
        } else {
          event.destroy()
            .then(res.status(200).send({
              success: true,
              message: 'Event deleted succesfully',
              event
            }));
        }
      })
      .catch(error => res.status(400).send({
        success: false,
        message: 'Something went wrong',
        error: error.message
      }));
  },
};
