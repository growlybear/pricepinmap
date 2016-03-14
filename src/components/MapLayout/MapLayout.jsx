
import React, { PropTypes } from 'react'
import classes from './MapLayout.scss'
import GoogleMap from 'google-map-react'
import { shallowCompare } from 'react-addons-shallow-compare'
import MapInputFields from 'components/MapInputFields/MapInputFields.jsx'

export default class MapLayout extends React.Component {
  static defaultProps = {
    center: {lat: 59.938043, lng: 30.337157},
    zoom: 9
  };

  static propTypes = {
    center: PropTypes.object.isRequired,
    zoom: PropTypes.number.isRequired
  };

// We need render function of components as pure (in other word, it must
// render the same result given the same props and state).
  shouldComponentUpdate (nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  render () {
    return (
      <div className={classes.fullScreen}>
        <MapInputFields />
        <GoogleMap
          bootstrapURLKeys={{
            key: 'AIzaSyB6mLuq06WnR7VV9A_Hzu19bxwhrTv3nDs'
          }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom} />
      </div>
    )
  }
}
