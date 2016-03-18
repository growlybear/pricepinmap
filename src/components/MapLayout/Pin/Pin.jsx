
import React, { PropTypes } from 'react'
import classes from './Pin.scss'

export default class Pin extends React.Component {

  static propTypes = {
    $dimensionKey: PropTypes.string,
    $hover: PropTypes.bool,
    price: PropTypes.string
  };

  render () {
    let style
    if (this.props.$hover) {
      style += ` ${classes.pinHover}`
    } else {
      style += ` ${classes.pin}`
    }
    const price = this.props.price
    if (price > 0 && price <= 100000) {
      style += ` ${classes.price2}`
    } else if (price > 100000 && price <= 200000) {
      style += ` ${classes.price3}`
    } else if (price > 200000 && price <= 500000) {
      style += ` ${classes.price4}`
    } else if (price > 500000 && price <= 1000000) {
      style += ` ${classes.price5}`
    }
    return (
      <div className={style}>
        {this.props.$dimensionKey}
      </div>
    )
  }
}
