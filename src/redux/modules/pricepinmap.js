import ErrorHandler from '../utils/ErrorHandler.js'
import { fitBounds } from 'google-map-react/utils'
// ------------------------------------
// Constants
// ------------------------------------
export const ADD_PIN = 'ADD_PIN'

// ------------------------------------
// Actions
// ------------------------------------
// NOTE: "Action" is a Flow interface defined in https://github.com/TechnologyAdvice/flow-interfaces
// if you'd like to learn more you can check out: flowtype.org.
// DOUBLE NOTE: there is currently a bug with babel-eslint where a `space-infix-ops` error is
// incorrectly thrown when using arrow functions, hence the oddity.
export const addPin = (pin) => {
  if (!!pin.soldPrice && !!Date.parse(pin.soldDate) && !!Object.keys(pin.addressObject).length) {
    return (dispatch, getState) => {
      const key = getState().pricepinmap.pinObjects.length + 1
      const pinObject = JSON.parse(JSON.stringify(pin))
      pinObject.key = key
      dispatch({
        type: ADD_PIN,
        pin: pinObject
      })
    }
  } else {
    if (!pin.soldPrice) {
      ErrorHandler('Please, enter price.')
    }
    if (!Date.parse(pin.soldDate)) {
      ErrorHandler('Please, choose date.')
    }
    if (!Object.keys(pin.addressObject).length) {
      ErrorHandler('Please, choose place.')
    }
    return (dispatch) => {}
  }
}

export const actions = {
  addPin
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ADD_PIN]: (state, action) => {
    const pinObjects = state.pinObjects.slice()
    pinObjects.push(action.pin)
    const allBounds = {
      's': [],
      'n': [],
      'w': [],
      'e': []
    }
    pinObjects.map((i) => {
      allBounds.s.push(Number(i.addressObject.gmaps.geometry.bounds.south))
      allBounds.n.push(Number(i.addressObject.gmaps.geometry.bounds.north))
      allBounds.w.push(Number(i.addressObject.gmaps.geometry.bounds.west))
      allBounds.e.push(Number(i.addressObject.gmaps.geometry.bounds.east))
    })
    const nw = {
      lat: Math.max.apply(null, allBounds.w),
      lng: Math.max.apply(null, allBounds.n)
    }
    const se = {
      lat: Math.min.apply(null, allBounds.e),
      lng: Math.min.apply(null, allBounds.s)
    }
    const size = {
      width: 1400,
      height: 872
    }
    const {center, zoom} = fitBounds({nw, se}, size)
    return ({ ...state, 'pinObjects': pinObjects, 'mapCenter': center, 'zoom': zoom })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  pinObjects: [],
  mapCenter: {lat: 0, lng: 0},
  zoom: 1
}
export default function PricePinMapReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
