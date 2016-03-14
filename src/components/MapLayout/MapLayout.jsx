
import React, { PropTypes } from 'react'
import classes from './MapLayout.scss'
import GoogleMap from 'google-map-react'
import MapInputFields from 'components/MapInputFields/MapInputFields.jsx'
import Pin from './Pin/Pin.jsx'

export default class MapLayout extends React.Component {
  static defaultProps = {
    center: {lat: 59.938043, lng: 30.337157},
    zoom: 9
  };

  static propTypes = {
    center: PropTypes.object.isRequired,
    addPin: PropTypes.func.isRequired,
    zoom: PropTypes.number.isRequired,
    pinObjects: PropTypes.array
  };

  render () {
    const pins = []
    if (this.props.pinObjects.length !== 0) {
      this.props.pinObjects.map((i) => {
        pins.push(
          <Pin
            key={i.key}
            lat={i.addressObject.location.lat}
            lng={i.addressObject.location.lng}
          />
          )
      })
    }
    return (
      <div className={classes.fullScreen}>
        <MapInputFields
          addPin={this.props.addPin}
        />
        <GoogleMap
          bootstrapURLKeys={{
            key: 'AIzaSyB6mLuq06WnR7VV9A_Hzu19bxwhrTv3nDs'
          }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}>
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
