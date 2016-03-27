import ErrorHandler from 'redux/utils/ErrorHandler'
import createDevToolsWindow from 'redux/utils/createDevToolsWindow'
import { getFakeDesctiption } from 'redux/utils/api/APIUtils'

describe('(Utils) App', () => {
  describe('(Helper) ErrorHandler', () => {
    it('Should be a function.', () => {
      expect(ErrorHandler).to.be.a('function')
    })
    it('Must show message.', () => {
      expect(ErrorHandler('Msg')).to.not.be.null
    })
  })
  describe('(Helper) devToolsWindows', () => {
    it('Should be a function.', () => {
      expect(createDevToolsWindow).to.be.a('function')
    })
  })
  describe('(API) getFakeDesctiption', () => {
    it('Should be a function.', () => {
      expect(getFakeDesctiption).to.be.a('function')
    })
    it('Should get value', () => {
      const result = getFakeDesctiption()
      result.then((data) => {
        expect(data).to.not.be.null
        expect(result).to.not.throw(Error)
      })
    })
  })
})
