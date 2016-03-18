
import React, { PropTypes } from 'react'
import classes from './MapLayout.scss'
import GoogleMap from 'google-map-react'
import MapInputFields from 'components/MapInputFields/MapInputFields.jsx'
import Pin from './Pin/Pin.jsx'

export default class MapLayout extends React.Component {
  static defaultProps = {
    center: {lat: 0, lng: 0},
    zoom: 1
  };

  static propTypes = {
    center: PropTypes.object.isRequired,
    addPin: PropTypes.func.isRequired,
    handleClickPinMap: PropTypes.func.isRequired,
    zoom: PropTypes.number.isRequired,
    pinObjects: PropTypes.array
  };

  handlePinClick (e) {
    this.props.handleClickPinMap(e)
  }

  render () {
    const pins = []
    let style = classes.fullScreen
    if (this.props.pinObjects.length !== 0) {
      this.props.pinObjects.map((i) => {
        pins.push(
          <Pin
            key={i.key}
            price={i.soldPrice}
            lat={i.addressObject.location.lat}
            lng={i.addressObject.location.lng}
          />
          )
      })
      style = classes.leftScreen
    }
    return (
      <div className={style}>
        <MapInputFields
          addPin={this.props.addPin}
        />
        <GoogleMap
          bootstrapURLKeys={{
            key: 'AIzaSyB6mLuq06WnR7VV9A_Hzu19bxwhrTv3nDs'
          }}
          defaultCenter={this.props.center}
          onChildClick={::this.handlePinClick}
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
