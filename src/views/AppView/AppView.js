import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { addPin } from '../../redux/modules/pricepinmap.js'
import MapLayout from 'components/MapLayout/MapLayout.jsx'
import PinCardsList from 'components/PinCardsList/PinCardsList.jsx'
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
      'showPinCardId': ''
    }
  }

  handleClickPinMap (id) {
    // If user click second time on the pin - we must hide expanded information
    if (this.state.showPinCardId === id) {
      this.setState({
        'showPinCardId': ''
      })
    } else {
      this.setState({
        'showPinCardId': id
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
