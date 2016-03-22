import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { addPin } from '../../redux/modules/pricepinmap.js'
import MapLayout from 'components/MapLayout/MapLayout.jsx'
import PinCardsList from 'components/PinCardsList/PinCardsList.jsx'
import _ from 'lodash'
import classes from './AppView.scss'

// Some components use react-tap-event-plugin to listen for touch events
// So, we must inject this plugin at the start of our app.
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

export class AppView extends React.Component {
  static propTypes = {
    addPin: PropTypes.func.isRequired,
    pinObjects: PropTypes.array
  };

  constructor () {
    super()
    this.state = {
      'showPinCardId': []
    }
  }

  componentWillReceiveProps (nextProps) {
    if (!_.isEqual(this.props.pinObjects, nextProps.pinObjects)) {
      // We add new pin and we must show last pin that added
      // But first, we must hide previous last pin
      const displayedPinDescription = _.remove(this.state.showPinCardId, (n) => {
        return n !== this.props.pinObjects[this.props.pinObjects.length - 1].key
      })
      // Add new last pin to displayed pins description
      displayedPinDescription.push(nextProps.pinObjects[nextProps.pinObjects.length - 1].key)
      this.setState({
        'showPinCardId': displayedPinDescription
      })
    }
  }

  handleClickPinMap (id) {
    // If user click second time on the pin - we must hide expanded information
    const isPinSelected = !!_.find(this.state.showPinCardId, (pin) => {
      return Number(pin) === Number(id)
    })
    if (isPinSelected) {
      const displayedPinDescription = _.remove(this.state.showPinCardId, (n) => {
        return Number(n) !== Number(id)
      })
      this.setState({
        'showPinCardId': displayedPinDescription
      })
    } else {
      const displayedPinDescription = this.state.showPinCardId
      displayedPinDescription.push(id)
      this.setState({
        'showPinCardId': displayedPinDescription
      })
    }
  }

  render () {
    return (
      <div className={classes.fullScreen}>
        <MapLayout
          addPin={this.props.addPin}
          pinObjects={this.props.pinObjects}
          showPinCardId={this.state.showPinCardId}
          handleClickPinMap={::this.handleClickPinMap}
          />
        <PinCardsList
          pinObjects={this.props.pinObjects}
          showPinCardId={this.state.showPinCardId}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  pinObjects: state.pricepinmap.pinObjects
})
export default connect((mapStateToProps), {
  addPin
})(AppView)
