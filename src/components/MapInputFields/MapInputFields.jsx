
import React, { PropTypes } from 'react'
import classes from './MapInputFields.scss'
import DatePicker from 'material-ui/lib/date-picker/date-picker'
import Geosuggest from 'react-geosuggest'
import TextField from 'material-ui/lib/text-field'
import Paper from 'material-ui/lib/paper'
import RaisedButton from 'material-ui/lib/raised-button'

export default class MapInputFields extends React.Component {
  static propTypes = {
    addPin: PropTypes.func.isRequired
  };

  constructor () {
    super()
    this.state = {
      'addressObject': {},
      'soldPrice': '',
      'soldDate': ''
    }
  }

  addPin () {
    this.props.addPin(this.state)
  }

  // Since there is no particular event associated with the change the first argument
  // will always be null and the second argument will be the new Date instance.
  soldDateHandler (e, newDate) {
    this.setState({
      'soldDate': newDate
    })
  }

  soldPriceHandler (e) {
    this.setState({
      'soldPrice': e.target.value
    })
  }

  suggestAddressHandler (value) {
    this.setState({
      'addressObject': value
    })
  }

  render () {
    const fieldStyle = {
      'width': '100px'
    }
    return (
      <Paper className={classes.fieldsContainer} zDepth={5}>
        <Geosuggest className={classes.geosuggest} onSuggestSelect={::this.suggestAddressHandler}/>
        <div className={classes.inputField}>
          <DatePicker
            container='inline'
            hintText='Sold date'
            textFieldStyle={fieldStyle}
            mode='landscape'
            onChange={::this.soldDateHandler}
            />
        </div>
        <div className={classes.inputField}>
          <TextField
            style={fieldStyle}
            hintText='Sold price'
            type='number'
            onChange={::this.soldPriceHandler}
            />
        </div>
        <div className={classes.inputField}>
          <RaisedButton label='Add' secondary onClick={::this.addPin}/>
        </div>
      </Paper>
    )
  }
}
