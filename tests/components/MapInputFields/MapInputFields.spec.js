import React from 'react'
import { mount, shallow } from 'enzyme'
import MapInputFields from 'components/MapInputFields/MapInputFields'
import DatePicker from 'material-ui/lib/date-picker/date-picker'
import Geosuggest from 'react-geosuggest'
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'

describe('(Components) <MapInputFields />', () => {
  it('allows us to set props add pin as func', () => {
    const testFunc = () => {
      return true
    }
    const wrapper = mount(
      <MapInputFields
        addPin={testFunc}
      />)
    expect(wrapper.props().addPin).to.be.a('function')
  })

  it('should render DatePicker components', () => {
    const wrapper = shallow(<MapInputFields pinObjects={[]} />)
    expect(wrapper.find(DatePicker)).to.have.length(1)
  })

  it('should render Geosuggest components', () => {
    const wrapper = shallow(<MapInputFields pinObjects={[]} />)
    expect(wrapper.find(Geosuggest)).to.have.length(1)
  })

  it('should render TextField components', () => {
    const wrapper = shallow(<MapInputFields pinObjects={[]} />)
    expect(wrapper.find(TextField)).to.have.length(1)
  })

  it('should render RaisedButton', () => {
    const wrapper = shallow(<MapInputFields pinObjects={[]} />)
    expect(wrapper.find(RaisedButton)).to.have.length(1)
  })
})
