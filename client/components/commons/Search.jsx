import React from 'react';
import PropTypes from 'prop-types';

export default class Search extends React.Component {
  state = {
    query: ''
  };

  handleChange = e => {
    // set the next state of the form
    this.setState({
      query: e.target.value
    }, () => {
      if (this.state.query === '') {
          this.props.getCenters();
        }
    });
  };

  handleSearch = event => {
    event.preventDefault();
    this.props.onSearch(this.state.query);
  };

  render() {
    const style = {
      width: '350px'
    };

    return (
      <form action="" method="post" onSubmit={this.handleSearch}>
        <div className="input-group mx-auto" id="search-bar" style={style}>
          <input
            type="text"
            name="query"
            className="form-control"
            placeholder="Search by name or location"
            value={this.state.query}
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

Search.propTypes = {
  onSearch: PropTypes.func,
  getCenters: PropTypes.func,
};
