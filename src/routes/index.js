import React from 'react'
import { Route, IndexRoute } from 'react-router'

import CoreLayout from 'layouts/CoreLayout/CoreLayout'
import AppView from 'views/AppView/AppView'

export default (store) => (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={AppView} />
  </Route>
)
