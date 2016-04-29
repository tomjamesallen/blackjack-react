import React, { PropTypes, Component } from 'react'
import { Router, Route, IndexRoute } from 'react-router'
// import shallowequal from 'shallowequal'
// import clone from 'clone'

// import RouteValidator from './utils/RouteValidator'

import BlackjackApp from './components/BlackjackApp.react'

export default class Root extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  };

  render() {
    const { history } = this.props
    return (
      <Router history={history}>
        <Route name='home' path='/' component={BlackjackApp}>
          <IndexRoute />
        </Route>
      </Router>
    )
  }
}
