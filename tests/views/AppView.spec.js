import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { bindActionCreators } from 'redux'
import { AppView } from 'views/AppView/AppView'
import { MapLayout } from 'components/MapLayout/MapLayout'
import { PinCardsList } from 'components/PinCardsList/PinCardsList'

function renderWithProps (props = {}) {
  return TestUtils.renderIntoDocument(<AppView {...props} />)
}

describe('(View) App', function () {
  let _rendered, _props, _spies

  beforeEach(function () {
    _spies = {}
    _props = {
      pinObjects: [],
      ...bindActionCreators({
        addPin: (_spies.addPin = sinon.spy())
      }, _spies.dispatch = sinon.spy())
    }

    _rendered = renderWithProps(_props)
  })

  it('Should include map layout component', function () {
    const mapLayout = TestUtils.scryRenderedComponentsWithType(_rendered, <MapLayout />)
    expect(mapLayout).to.exist
  })

  it('Should include pinCardList component', function () {
    const pinCardList = TestUtils.scryRenderedComponentsWithType(_rendered, <PinCardsList />)
    expect(pinCardList).to.exist
  })
})
