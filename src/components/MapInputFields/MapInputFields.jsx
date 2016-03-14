
import React, { PropTypes } from 'react'
import classes from './MapInputFields.scss'
import DatePicker from 'material-ui/lib/date-picker/date-picker'
import Geosuggest from 'react-geosuggest'
import TextField from 'material-ui/lib/text-field'
import Paper from 'material-ui/lib/paper'
import RaisedButton from 'material-ui/lib/raised-button'

export default class MapInputFields extends React.Component {
  static propTypes = {
  };

  render () {
    const fieldStyle = {
      'width': '100px'
    }
    return (
      <Paper className={classes.fieldsContainer} zDepth={5}>
        <Geosuggest className={classes.geosuggest}/>
        <span className={classes.inputField}><DatePicker textFieldStyle={fieldStyle} hintText='Sold date' /></span>
        <span className={classes.inputField}><TextField style={fieldStyle} hintText='Sold price' type='number' /></span>
        <span className={classes.inputField}><RaisedButton label='Add' secondary /></span>
      </Paper>
    )
  }
}
