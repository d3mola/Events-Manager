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
    const { title, notes, centerId, date } = req.body;
    // check if the user fills the required fields
    if (!centerId || !title || !date) {
      return res.status(401).json({
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
      .then(originalEvent => {
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
            .then(event =>
              res.status(201).json({
                success: true,
                message: 'Event created succesfully!',
                event
              })
            )
            .catch(error =>
              res.status(404).json({
                success: false,
                message: 'Center does not exist',
                error: error.message
              })
            );
        }
      })
      .catch(error =>
        res.status(500).json({
          success: false,
          message: 'Invalid input',
          error: error.message
        })
      );
  },

  /**
   * @description updates an event
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   * @returns {object} new event
   */
  updateEvent: (req, res) => {
    const { centerId, date } = req.body;

    Event.findById(req.params.eventId)
      .then(event => {
        if (!event) {
          return res.status(404).send({
            success: false,
            message: 'Event does not exist!'
          });
        }
        // check if the person that created the event is tryign to update
        if (event.userId !== req.user.userId) {
          return res.status(401).send({
            success: false,
            message: "You're not authorized to access this route"
          });
        } else {
          Event.findOne({
            where: {
              centerId,
              date
            }
          })
            .then(found => {
              // console.log('bbbbbbbb,', found.id, event.id)
              if (found && found.id != event.id) {
                return res.status(400).json({
                  success: false,
                  message: 'Center already booked!'
                });
              } else {
                return event.update({
                  title: req.body.title || event.title,
                  notes: req.body.notes || event.notes,
                  centerId: req.body.centerId || event.centerId,
                  date: req.body.date || event.date
                });
              }
            })
            .then(updatedEvent => {
              res.status(200).send({
                success: true,
                message: 'Event succesfully updated!',
                updatedEvent
              });
            });
        }
      })
      .catch(error =>
        res.status(400).json({
          success: false,
          message: 'Could not update event',
          error: error.message
        })
      );
  },

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
      .then(event => {
        if (!event) {
          return res.status(400).json({
            success: false,
            message: 'Event does not exist'
          });
        } else {
          if (event.userId != req.user.userId) {
            return res.status(403).json({
              success: false,
              message: 'You cannot delete this event'
            });
          }
          return event.destroy().then(
            res.status(200).send({
              success: true,
              message: 'Event deleted succesfully',
              event
            })
          );
        }
      })
      .catch(error =>
        res.status(400).send({
          success: false,
          message: 'Something went wrong',
          error: error.message
        })
      );
  }
};
