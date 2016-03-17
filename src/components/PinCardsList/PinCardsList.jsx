
import React, { PropTypes } from 'react'
import classes from './PinCardsList.scss'
import PinCard from './PinCard/PinCard.jsx'
import Paper from 'material-ui/lib/paper'

export default class PinCardsList extends React.Component {

  static propTypes = {
    pinObjects: PropTypes.array
  };

  render () {
    const pins = []
    let style = classes.fullScreen
    if (this.props.pinObjects.length !== 0) {
      this.props.pinObjects.map((i) => {
        let expandable = true
        if (this.props.pinObjects.length === i.key) {
          expandable = false
        }
        pins.push(
          <PinCard
            expandable={expandable}
            key={i.key}
            title={i.key}
            price={i.soldPrice}
            date={i.soldDate}
            addressLabel={i.addressObject.label}
          />
          )
      })
      style = classes.rightPartScreen
    }
    pins.reverse()
    return (
      <Paper zDepth={5} className={style}>
     {pins.map((i) => {
       return (
          i
        )
     }, this)}
      </Paper>
    )
  }
}
