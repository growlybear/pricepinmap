import {
  ADD_PIN,
  addPin,
  default as PricePinMapReducer
} from 'redux/modules/pricepinmap'

describe('(Redux Module) PricePinMap', function () {
  it('Should export a constant ADD_PIN.', function () {
    expect(ADD_PIN).to.equal('ADD_PIN')
  })

  describe('(Reducer)', function () {
    it('Should be a function.', function () {
      expect(PricePinMapReducer).to.be.a('function')
    })

    it('Should initialize with a state of { pinObjects: [] }.', function () {
      expect(PricePinMapReducer(undefined, {})).to.eql({ pinObjects: [] })
    })

    it('Should return the previous state if an action was not matched.', function () {
      let state = PricePinMapReducer(undefined, {})
      expect(state).to.eql({ pinObjects: [] })
      state = PricePinMapReducer(state, {type: '@@@@@@@'})
      expect(state).to.eql({ pinObjects: [] })
    })
  })

  describe('(Action Creator) addPin', function () {
    let _globalState
    let _dispatchSpy
    let _getStateSpy

    beforeEach(function () {
      _globalState = {
        pricepinmap: PricePinMapReducer(undefined, {})
      }
      _dispatchSpy = sinon.spy((action) => {
        _globalState = {
          ..._globalState,
          pricepinmap: PricePinMapReducer(_globalState.pricepinmap, action)
        }
      })
      _getStateSpy = sinon.spy(() => {
        return _globalState
      })
    })

    it('Should be exported as a function.', function () {
      expect(addPin).to.be.a('function')
    })
  })
})
