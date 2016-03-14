/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import {} from '../../redux/modules/pricepinmap.js'
import MapLayout from 'components/MapLayout/MapLayout.jsx'
import classes from './AppView.scss'

// Some components use react-tap-event-plugin to listen for touch events
// So, we must inject this plugin at the start of our app.
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

// // We use Flow (http://flowtype.org/) to type our component's props
// and state. I've included both regular propTypes and
// Flow types, but if you want to try just using Flow you'll want to
// disable the eslint rule `react/prop-types`.
// NOTE: You can run `npm run flow:check` to check for any errors in your
// code, or `npm i -g flow-bin` to have access to the binary globally.
type Props = {
  counter: number,
  doubleAsync: Function,
  increment: Function
};

export class AppView extends React.Component<void, Props, void> {
  static propTypes = {
  };

  constructor () {
    super()
    this.state = {
    }
  }

  render () {
    return (
      <div className={classes.fullScreen}>
        <MapLayout />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
})
export default connect((mapStateToProps), {
})(AppView)
