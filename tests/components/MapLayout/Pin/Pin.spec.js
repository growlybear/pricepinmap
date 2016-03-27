import React from 'react'
import { mount } from 'enzyme'
import Pin from 'components/MapLayout/Pin/Pin'

describe('(Components) <Pin />', () => {
  it('allows us to set props', () => {
    const wrapper = mount(
      <Pin
        $dimensionKey='30'
        price='50'
        selected
      />)
    expect(wrapper.props().price).to.equal('50')
    wrapper.setProps({ price: '20', $dimensionKey: '30', selected: false })
    expect(wrapper.props().price).to.equal('20')
  })
  it('rendered the pin title', () => {
    const wrapper = mount(
      <Pin
        $dimensionKey='30'
        price='50'
        selected
      />)
    expect(wrapper.text()).to.contain('30')
  })
})
