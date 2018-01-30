import React from 'react'
import PropTypes from 'prop-types'

// displays the event title and id
const Event = ({ title, id }) => (
  <div
    style={{
      marginTop:10 ,marginBottom:10, textTransform:'uppercase'
    }}
  >
    {title} - {id}
  </div>
)

Event.propTypes = {
  title: PropTypes.string,
  id: PropTypes.number
}

export default Event