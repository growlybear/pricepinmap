import { APIConstants } from './APIConstants.js'
import fetch from 'isomorphic-fetch'
import ErrorHandler from '../ErrorHandler.js'

export function getFakeDesctiption () {
  return new Promise((resolve, reject) => {
    fetch(`${APIConstants.FAKE_DESCRIPTION}`)
          .then((description) => description.json())
          .then((jsonDescription) => {
            resolve(jsonDescription)
          }).catch((ex) => {
            ErrorHandler(ex)
          })
  })
}
