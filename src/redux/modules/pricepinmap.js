import ErrorHandler from '../utils/ErrorHandler.js'
import { getFakeDesctiption } from '../utils/api/APIUtils.js'
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
      getFakeDesctiption().then((response) => {
        const key = getState().pricepinmap.pinObjects.length + 1
        const pinObject = JSON.parse(JSON.stringify(pin))
        pinObject.key = key
        pinObject.description = response[0].slice(0, 100)
        console.log(JSON.stringify(pinObject))
        dispatch({
          type: ADD_PIN,
          pin: pinObject
        })
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
    return ({ ...state, 'pinObjects': pinObjects })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  pinObjects: []
}
export default function PricePinMapReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
