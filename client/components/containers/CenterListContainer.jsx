import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Pagination from 'rc-pagination';
import Select from 'rc-select';
import queryString from 'query-string';

import Search from '../commons/Search';
import Header from '../commons/Header';
import Footer from '../commons/Footer';

import {
  getCenters,
  searchCenters,
} from '../../actions/actionCreators';
import CenterListComponent from '../presentationals/CenterListComponent';

/**
 * this container is connected to redux store
 * and passes down props to CenterListComponent
 * @class CenterListComponent
 *
 * @extends {React.Component}
 */
export class CenterListContainer extends React.Component {
  /**
   * @description fetch centers as soon as component renders
   *
   * @returns {array} list of centers
   *
   * @memberof Centers
   */
  componentDidMount() {
    const parsedQueryString = queryString.parse(location.search);
    const { page, limit } = parsedQueryString;
    this.props.getCenters(page, limit);
  }

  /**
   * @description gets centers based on the param given
   *
   * @param { number } current current page number
   * @param { number } pageSize pageSize number
   *
   * @returns { array } list of centers taht satisfy the param
   */
  onPageChange = (current, pageSize) => {
    this.props.getCenters(current, pageSize);
  };

  /**
   * @description gets centers when the page buttons are clicked
   *
   * @param { number } current current page number
   * @param { number } pageSize pageSize number
   *
   * @returns { array } list of centers taht satisfy the param
   */
  onShowSizeChange = (current, pageSize) => {
    this.props.getCenters(current, pageSize);
  };

  /**
   * @description main render function
   *
   * @returns {jsx} jsx representation of component
   *
   * @memberof Centers
   */
  render() {
    const { paginationData, isAdmin } = this.props;
    return (
      <div>
        <Header
          links={{
            events: 'events'
            // 'add center': 'centers/add'
          }}
        />

        <div className="main">
          <h3 className="text-center">These are the available centers</h3>
          <Search
            centers={this.props.centers}
            onSearch={query => this.props.searchCenters(query)}
            getCenters={this.props.getCenters}
          />

          {isAdmin === 'true' && (
            <div>
            <Link to="/centers/add" className="float">
              <i className="fa fa-plus my-float" />
              <span>add center</span>
            </Link>
            </div>
          )}

          <CenterListComponent
            centers={this.props.centers}
            match={this.props.match}
            isFetching={this.props.isFetching}
            error={this.props.error}
          />

          <Pagination
            style={{ display: 'flex', justifyContent: 'center' }}
            current={paginationData.page}
            total={paginationData.count}
            defaultPageSize={9}
            pageSize={9}
            onChange={this.onPageChange}
            selectComponentClass={Select}
            showQuickJumper
            showSizeChanger
            onShowSizeChange={this.onShowSizeChange}
            locale={{ items_per_page: 'Items', skip: 'Goto' }}
            className="custom-pagination"
          />
        </div>

        <Footer />
      </div>
    );
  }
}

CenterListContainer.propTypes = {
  centers: PropTypes.array.isRequired,
  getCenters: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isAdmin: PropTypes.string,
  paginationData: PropTypes.object,
  searchCenters: PropTypes.func
};

const mapStateToProps = state => ({
  centers: state.centersReducer.centers,
  isFetching: state.centersReducer.isFetching,
  error: state.centersReducer.error,
  paginationData: state.centersReducer.paginationData,
  isAdmin: state.authReducer.isAdmin
});

export default connect(
  mapStateToProps,
  {
    getCenters,
    searchCenters
  }
)(CenterListContainer);
