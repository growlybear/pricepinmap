import React from 'react'
import { mount } from 'enzyme'
import PinCardsList from 'components/PinCardsList/PinCardsList'

describe('(Components) <PinCardsList />', () => {
  it('allows us to set props add pin as func', () => {
    const wrapper = mount(
      <PinCardsList
        pinObjects={[]}
      />)
    expect(wrapper.props().pinObjects).to.eql([])
  })
})
