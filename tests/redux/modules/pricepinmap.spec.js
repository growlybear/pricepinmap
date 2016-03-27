import {
  ADD_PIN,
  addPin,
  default as PricePinMapReducer
} from 'redux/modules/pricepinmap'

describe('(Redux Module) PricePinMap', () => {
  it('Should export a constant ADD_PIN.', () => {
    expect(ADD_PIN).to.equal('ADD_PIN')
  })

  describe('(Reducer)', () => {
    it('Should be a function.', () => {
      expect(PricePinMapReducer).to.be.a('function')
    })

    it('Should initialize with a state of { pinObjects: [] }.', () => {
      expect(PricePinMapReducer(undefined, {})).to.eql({ pinObjects: [] })
    })

    it('Should return the previous state if an action was not matched.', () => {
      let state = PricePinMapReducer(undefined, {})
      expect(state).to.eql({ pinObjects: [] })
      state = PricePinMapReducer(state, {type: '@@@@@@@'})
      expect(state).to.eql({ pinObjects: [] })
    })
  })

  describe('(Action Creator) addPin', () => {
    let _globalState
    let _dispatchSpy
    let _getStateSpy

    beforeEach(() => {
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

    it('Should be exported as a function.', () => {
      expect(addPin).to.be.a('function')
    })
  })
})
