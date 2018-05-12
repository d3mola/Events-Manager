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
          return res.status(404).json({
            success: false,
            message: 'This center is not available for this day'
          });
          // else create the event
        }
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
    const { centerId, date } = req.body;
    const id = req.params.eventId;
    Event.findById(id)
      .then(event => {
        if (!event) {
          return res.status(404).send({
            success: false,
            message: 'Event does not exist!'
          });
        }
        // check if the person that created the event is trying to update
        // console.log(req.user, '<<<<<<<<>>>>>>>>>>');
        if (event.userId !== req.user.userId) {
          return res.status(403).send({
            success: false,
            message: "You're not authorized to access this route"
          });
        }
        Event.findOne({
          where: {
            centerId,
            date
          }
        }).then(existingEvent => {
          // console.log('bbbbbbbb,', existingEvent.id, event.id)
          if (existingEvent) {
            return res.status(404).json({
              success: false,
              message: 'Center already booked!'
            });
          }
          Event.update(
            {
              title: req.body.title || event.title,
              notes: req.body.notes || event.notes,
              centerId: req.body.centerId || event.centerId,
              date: req.body.date || event.date
            },
            { where: { id }, returning: true, plain: true }
          ).then(updatedEventInfo => {
            res.status(200).send({
              success: true,
              message: 'Event updated succesfully!',
              updatedEvent: updatedEventInfo[1]
            });
          });
        });
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
     * else look for the center associted with the event and set the isavailble status to false
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
            res.status(200).send({
              success: true,
              message: 'Event deleted succesfully',
              event
            })
          );
        }
      })
      .catch(error =>
        res.status(500).send({
          success: false,
          message: 'Something went wrong, internal server error',
          error: error.message
        })
      );
  }
};
