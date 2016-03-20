
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
    // We want to handle click event and addPin event
    // So, we need to store pinsCard at the state of the component
    // In order to update component every time, when new props revieved
    this.state = {
      'pinsCard': [],
      'pinObjects': [],
      'showPinCardId': ''
    }
  }

  componentWillReceiveProps (nextprops) {
    // We need to show description of the last element
    // So, if it's not recieved click event - we must update all pinObjects
    // and display expanded information of the last element
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
    // Initially set styles for CardList to full screen and hide this pard
    let style = classes.fullScreen

    // If there is at least one added pin - show CardList and add click handler for pin
    if (this.state.pinObjects.length !== 0) {
      this.state.pinObjects.map((i) => {
        const isLastPin = this.state.pinObjects.length === i.key
        const isClickedPin = Number(this.state.showPinCardId) === Number(i.key)
        const isClickedLastPin = this.state.pinObjects.length !== Number(this.state.showPinCardId)

        // Initially set to hide description
        let expandable = false
        if ((isLastPin || isClickedPin) && isClickedLastPin) {
          expandable = true
        }
        this.state.pinsCard.push(
          <PinCard
            expand={expandable}
            key={i.key}
            title={i.key}
            price={i.soldPrice}
            description={i.description}
            date={i.soldDate}
            addressLabel={i.addressObject.label}
          />
          )
      })
      // Set style to display CardList
      style = classes.rightPartScreen
    }
    // Reverse array, because we need to display last pin at the top of the CardList
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
