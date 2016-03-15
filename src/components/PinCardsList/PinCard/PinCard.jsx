
import React, { PropTypes } from 'react'
import Card from 'material-ui/lib/card/card'
import CardHeader from 'material-ui/lib/card/card-header'
import CardText from 'material-ui/lib/card/card-text'
import moment from 'moment'

export default class PinCard extends React.Component {

  static propTypes = {
    price: PropTypes.string,
    expandable: PropTypes.bool,
    title: PropTypes.number,
    date: PropTypes.string,
    addressLabel: PropTypes.string
  };

  render () {
    const date = moment(this.props.date).format('L')
    return (
      <Card>
        <CardHeader
          title={this.props.title}
          titleStyle={{
            'color': 'black',
            'display': 'block',
            'position': 'relative',
            'top': '2px',
            'fontSize': '30px'
          }}
          avatar='http://lorempixel.com/100/100/nature/'
          actAsExpander
          showExpandableButton
        />
        <CardText expandable={this.props.expandable}>
          <h5>{this.props.addressLabel}</h5>
          <h5>Sold: ${this.props.price}</h5>
          <h5>{date}</h5>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
        </CardText>
      </Card>
    )
  }
}
