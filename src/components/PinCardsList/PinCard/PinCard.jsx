
import React, { PropTypes } from 'react'
import Paper from 'material-ui/lib/paper'
import classes from './PinCard.scss'
import moment from 'moment'
import RaisedButton from 'material-ui/lib/raised-button'

export default class PinCard extends React.Component {

  static propTypes = {
    price: PropTypes.string,
    expand: PropTypes.bool,
    title: PropTypes.number,
    date: PropTypes.string,
    addressLabel: PropTypes.string
  };

  constructor () {
    super()
    this.state = {
      'expand': false
    }
  }

  componentDidMount () {
    this.setState({
      'expand': this.props.expand
    })
  }

  componentWillReceiveProps (nextprops) {
    this.setState({
      'expand': nextprops.expand
    })
  }

  handleExpandButtonClick () {
    this.setState({
      'expand': !this.state.expand
    })
  }

  render () {
    const date = moment(this.props.date).format('L')
    const buttonTitle = this.state.expand ? 'hide' : 'show'
    const expandContentStyle = this.state.expand ? classes.displayContent : classes.hideContent
    return (
      <Paper className={classes.pinCard} zDepth={1}>
        <header className={classes.pinCardHeader}>
          <img className={classes.headerImage} src='http://lorempixel.com/100/100/nature/' />
          <h3 className={classes.headerTitle}>{this.props.title}</h3>
          <div className={classes.headerButton}>
            <RaisedButton label={buttonTitle} secondary onClick={::this.handleExpandButtonClick} />
          </div>
        </header>
        <div className={expandContentStyle}>
          <h5>{this.props.addressLabel}<br />
          Sold: ${this.props.price}<br />
          {date}</h5>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
        </div>
      </Paper>
    )
  }
}
