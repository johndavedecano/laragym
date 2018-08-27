import React from 'react';
import {withRouter} from 'react-router';
import extend from 'lodash/extend';
import queryString from 'query-string';

export default function(Component) {
  class Wrapper extends React.Component {
    onChangeFilter = (key, value) => {
      const {location, history} = this.props;

      let query = queryString.parse(location.search);

      if (value === null || value === '') {
        delete query[key];
      } else {
        query = extend(query, {
          [key]: value,
        });
      }

      history.push({
        pathname: location.pathname,
        search: queryString.stringify(query),
      });
    };

    render() {
      return <Component {...this.props} onChangeFilter={this.onChangeFilter} />;
    }
  }

  return withRouter(Wrapper);
}
