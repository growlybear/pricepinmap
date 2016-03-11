import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import pricepinmap from './modules/pricepinmap'

export default combineReducers({
  pricepinmap,
  router
})
