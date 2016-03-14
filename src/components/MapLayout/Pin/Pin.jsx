
import React, { PropTypes } from 'react'
import classes from './Pin.scss'

export default class Pin extends React.Component {

  static propTypes = {
    $dimensionKey: PropTypes.string
  };

  render () {
    return (
      <div className={classes.pin}>
        {this.props.$dimensionKey}
      </div>
    )
  }
}
