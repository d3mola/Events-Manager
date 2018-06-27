import db from '../models';

const { Event, Center } = db;

export default {
  /**
   * @description adds a new event to the database
   *
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   *
   * @returns {object} new event
   */
  createEvent: (req, res) => {
    const { title, notes, centerId, date } = req.body;
    // check if date is already taken
    Event.find({
      where: {
        centerId,
        date
      }
    })
      .then(existingEvent => {
        // an event has taken the center and date
        if (existingEvent) {
          return res.status(409).json({
            success: false,
            message: 'This center is not available for this day'
          });
        }

        // check if the center picked exists
        Center.findById(centerId).then(existingCenter => {
          if (!existingCenter) {
            return res.status(404).json({
              success: false,
              message: 'Center does not exist!'
            });
          }

          Event.create({
            title,
            notes,
            centerId,
            date,
            userId: req.user.userId // from the decoded token
          })
            .then(event =>
              res.status(201).json({
                success: true,
                message: 'Event created succesfully!',
                event
              })
            )
            .catch(error =>
              res.status(500).json({
                success: false,
                message:
                  'Something went wrong, internal server error' || error.message
              })
            );
        });
        //
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
   * @description updates an event
   *
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   *
   * @returns {object} response onject with updated event
   */
  updateEvent: (req, res) => {
    const id = req.params.eventId;
    Event.findById(id)
      .then(event => {
        if (!event) {
          return res.status(404).json({
            success: false,
            message: 'Event does not exist!'
          });
        }

        // if centerId is not supplied, use the original centerId from the db
        // const centerId = req.body.centerId || event.centerId;
        // check if the person that created the event is trying to update
        if (event.userId !== req.user.userId) {
          return res.status(403).json({
            success: false,
            message: "You're not authorized to access this route"
          });
        }

        const title = req.body.title || event.title;
        const notes = req.body.notes || event.notes;
        const centerId = req.body.centerId || event.centerId;
        const date = req.body.date || event.date;

        Center.findById(centerId).then(existingCenter => {
          if (!existingCenter) {
            return res.status(404).json({
              success: false,
              message: 'Center does not exist!'
            });
          }

          Event.findOne({
            where: {
              centerId: req.body.centerId,
              date: req.body.date
            }
          }).then(existingEvent => {
            if (existingEvent && existingEvent.userId !== req.user.userId) {
              return res.status(409).json({
                success: false,
                message: 'Center already booked by another user!'
              });
            }

            if (
              existingEvent &&
              existingEvent.userId === req.user.userId &&
              existingEvent.id !== Number(req.params.eventId)
            ) {
              return res.status(409).json({
                success: false,
                message: 'Center already booked by you!'
              });
            }

            Event.update(
              {
                title,
                notes,
                centerId,
                date
              },
              { where: { id }, returning: true, plain: true }
            ).then(updatedEventInfo => {
              return res.status(200).send({
                success: true,
                message: 'Event updated succesfully!',
                updatedEvent: updatedEventInfo[1]
              });
            });
          });
        }); //
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
   * @description deletes an event
   *
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   *
   * @returns {object} deleted event
   */
  deleteEvent: (req, res) => {
    /**
     * look for the event by param, then, if the event doesnt exist, throw err
     * else look for the center associted with the event and
     * set the isavailble status to false
     * then destroy
     */
    const id = req.params.eventId;
    Event.findById(id)
      .then(event => {
        if (!event) {
          return res.status(404).json({
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
            res.status(200).json({
              success: true,
              message: 'Event deleted succesfully',
              event
            })
          );
        }
      })
      .catch(error =>
        res.status(500).json({
          success: false,
          message: 'Something went wrong, internal server error',
          error: error.message
        })
      );
  }
};
