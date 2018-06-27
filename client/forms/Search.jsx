import React from 'react';

export default class Search extends React.Component {
  state = {
    query: ''
  };

  handleChange = e => {
    // set the next state of the form
    this.setState({
      [e.target.name]: e.target.value
    });

    if (this.state.query === '') {
      this.props.onclearFlashMessage();
    }
  };

  handleSearch = event => {
    event.preventDefault();
    console.log('searched for:', this.state.qurey);
    this.props.onSearch(this.state.query);
  };

  render() {
    const style = {
      width: '350px'
    };

    const { centers } = this.props;
    return (
      <form action="" method="post" onSubmit={this.handleSearch}>
        <div className="input-group mx-auto" style={style}>
          {/* <i className="fa fa-search" /> */}
          <input
            type="text"
            name="query"
            className="form-control"
            placeholder="Search by name or location"
            value={this.state.search}
            onChange={this.handleChange}
          />
          <button
            className="input-group-addon btn btn-success"
            type="submit"
            value=""
            style={{ background: '#18524e', color: 'white' }}>
            <i className="fa fa-search" />
          </button>
        </div>
      </form>
    );
  }
}
