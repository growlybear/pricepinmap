import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import {} from '../../redux/modules/pricepinmap.js'
// import classes from './AppView.scss'

export class AppView extends React.Component {
  static propTypes = {
  };

  constructor () {
    super()
    this.state = {
    }
  }

  render () {
    return (
      <h1>Test</h1>
    )
  }
}

const mapStateToProps = (state) => ({
})
export default connect((mapStateToProps), {
})(AppView)
