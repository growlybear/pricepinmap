import React from 'react'
import { mount, shallow } from 'enzyme'
import MapLayout from 'components/MapLayout/MapLayout'
import MapInputFields from 'components/MapInputFields/MapInputFields'
import GoogleMap from 'google-map-react'

describe('(Components) <MapLayout />', () => {
  it('allows us to set props', () => {
    const wrapper = mount(
      <MapLayout
        pinObjects={[]}
      />)
    expect(wrapper.props().pinObjects).to.eql([])
  })

  it('should render MapInputFields components', () => {
    const wrapper = shallow(<MapLayout pinObjects={[]} />)
    expect(wrapper.find(MapInputFields)).to.have.length(1)
  })

  it('should render GoogleMap', () => {
    const wrapper = shallow(<MapLayout pinObjects={[]} />)
    expect(wrapper.find(GoogleMap)).to.have.length(1)
  })
})
