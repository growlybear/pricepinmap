
import React, { PropTypes } from 'react'
import classes from './PinCardsList.scss'
import PinCard from './PinCard/PinCard.jsx'
import Paper from 'material-ui/lib/paper'
import _ from 'lodash'

export default class PinCardsList extends React.Component {

  static propTypes = {
    pinObjects: PropTypes.array,
    showPinCardId: PropTypes.string
  };

  constructor () {
    super()
    this.state = {
      'pinsCard': [],
      'pinObjects': [],
      'showPinCardId': ''
    }
  }

  componentWillReceiveProps (nextprops) {
    if (_.isEqual(this.state.pinObjects, nextprops.pinObjects)) {
      this.setState({
        'pinsCard': [],
        'pinObjects': nextprops.pinObjects,
        'showPinCardId': nextprops.showPinCardId
      })
    } else {
      this.setState({
        'pinsCard': [],
        'pinObjects': nextprops.pinObjects,
        'showPinCardId': ''
      })
    }
  }

  render () {
    let style = classes.fullScreen
    if (this.state.pinObjects.length !== 0) {
      this.state.pinObjects.map((i) => {
        let expandable = false
        if (this.state.pinObjects.length === i.key || Number(this.state.showPinCardId) === Number(i.key)) {
          expandable = true
        }
        this.state.pinsCard.push(
          <PinCard
            expand={expandable}
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
    this.state.pinsCard.reverse()
    return (
      <Paper zDepth={5} className={style}>
     {this.state.pinsCard.map((i) => {
       return (
          i
        )
     }, this)}
      </Paper>
    )
  }
}
