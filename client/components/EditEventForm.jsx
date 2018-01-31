import React, { Component } from 'react';

class EditEventForm extends Component {

  constructor(props) {
    super(props);
    // this.state = {
    //   title: '',
    //   notes: '',
    //   center: '',
    //   date: ''
    // }
  }

  render() {
    const data = this.props.data;
    const { title, notes, center, date } = data;
    const { handleChange, handleSubmit } = this.props;
    return (
      <div className="jumbotron">
          <form id="form-box" action="" method="post" onSubmit={handleSubmit}>
            <h3 className="text-center" style={{bottom:10}}>Edit Event!</h3>
            
            <div className="form-group">
                <label htmlFor="event-name">Event Name:</label>
                <input className="form-control" type="text" name="title" id="event-name" placeholder="E.g. John's convocation" value={title} onChange={handleChange} required/>                  
            </div>

            <div>
              <label htmlFor="notes">Optional Note:</label>
              <textarea className="form-control" name="notes" id="notes" cols="50" rows="4" placeholder="Enter an optional note"  value={notes} onChange={handleChange}></textarea>
            </div>
            <br />

            <div className="form-group">
              <label htmlFor="center">Event Center: </label>
              <select required className="form-control" name="center" id="center" value={center} onChange={handleChange}>
                <option value="1" title="Oluyole, Ibadan">First hall</option>
                <option value="2" title="Banana Island">Emerald hall</option>
                <option value="3" title="Ketu">Sapphire</option>
                <option value="4" title="Ikoyi">Gold</option>
                <option value="5" title="Oluyole, Ibadan">Silver hall</option>
                <option value="6" title="Victoria Island Lagos">Ruby Hall</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="date">Choose a date and time:<br />MM/DD/YYYY</label>
              <input required className="form-control" type="date" name="date" id="date" value={date} onChange={handleChange}/>
            </div>

            <button type="submit" className="btn btn-success"><i className="fa fa-send"></i></button>
          </form>
      </div>
    );
  }

}

 export default EditEventForm;