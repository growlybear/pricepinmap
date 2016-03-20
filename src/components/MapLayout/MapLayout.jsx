
import React, { PropTypes } from 'react'
import classes from './MapLayout.scss'
import GoogleMap from 'google-map-react'
import MapInputFields from 'components/MapInputFields/MapInputFields.jsx'
import { fitBounds } from 'google-map-react/utils'
import Pin from './Pin/Pin.jsx'

export default class MapLayout extends React.Component {

  static propTypes = {
    addPin: PropTypes.func.isRequired,
    handleClickPinMap: PropTypes.func.isRequired,
    showPinCardId: PropTypes.string,
    pinObjects: PropTypes.array
  };

  handlePinClick (e) {
    // Return id of pin that was clicked to AppView
    // So, we will can show/hide detailed information of pin.
    this.props.handleClickPinMap(e)
  }

  render () {
    // If there is no pins - we set map size to full screen and hide part with list of pins.
    let style = classes.fullScreen
    // Next, we want to render all added pins to the map.
    // Also, if there is at least one pins - we change map size.
    const pins = []
    if (this.props.pinObjects.length !== 0) {
      this.props.pinObjects.map((i) => {
        let selected = false
        const isSelectedPin = i.key === Number(this.props.showPinCardId)
        const notLastPin = i.key !== this.props.pinObjects.length
        if ((isSelectedPin) && notLastPin) {
          selected = true
        }
        pins.push(
          <Pin
            key={i.key}
            selected={selected}
            price={i.soldPrice}
            lat={i.addressObject.location.lat}
            lng={i.addressObject.location.lng}
          />
          )
      })
      style = classes.leftScreen
    }

    // We use https://github.com/istarkov/google-map-react#fitbounds-func
    // To dynamically fit bounds on the map.
    // For it we need two geometry corners(NW, SE) and size in px of the map
    // It will return coordinates of the center and the value of zoom.

    // First of all we need to get all dots of all directions from pins.
    const allBounds = {
      's': [],
      'n': [],
      'w': [],
      'e': []
    }
    // We need to declare default value for zoom and center
    // if there are no pins on the map.
    let zoom = 1
    let center = {
      lat: 0,
      lng: 0
    }
    // Next, we must check if there is at least one pin on the map
    // And if it's return true - we must get bounds and zoom for that pin.
    if (this.props.pinObjects.length) {
      // Get all dots of all directions
      this.props.pinObjects.map((i) => {
        allBounds.s.push(Number(i.addressObject.gmaps.geometry.viewport.south))
        allBounds.n.push(Number(i.addressObject.gmaps.geometry.viewport.north))
        allBounds.w.push(Number(i.addressObject.gmaps.geometry.viewport.west))
        allBounds.e.push(Number(i.addressObject.gmaps.geometry.viewport.east))
      })
      // Get coordinates of two geometry corners that will cover all pins
      const nw = {
        lat: Math.max.apply(null, allBounds.n),
        lng: Math.min.apply(null, allBounds.w)
      }
      const se = {
        lat: Math.min.apply(null, allBounds.s),
        lng: Math.max.apply(null, allBounds.e)
      }
      // We get must get width/height from refs because there are different size of screens
      // And we cann't set it statically.
      let size = {
        width: this.refs.googleMap.clientWidth,
        height: this.refs.googleMap.clientHeight
      }
      // Get bounds that cover all pins and change default value for center and zoom.
      const bounds = fitBounds({nw, se}, size)
      center = bounds.center
      zoom = bounds.zoom
    }
    return (
      <div className={style} ref='googleMap'>
        <MapInputFields
          addPin={this.props.addPin}
        />
        <GoogleMap
          bootstrapURLKeys={{
            key: 'AIzaSyB6mLuq06WnR7VV9A_Hzu19bxwhrTv3nDs'
          }}
          center={center}
          zoom={zoom}
          onChildClick={::this.handlePinClick}>
           {pins.map((i) => {
             return (
                i
              )
           }, this)}
        </GoogleMap>
      </div>
    )
  }
}
