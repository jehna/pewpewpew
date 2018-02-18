import { bind } from '../src/react-wrapper.mjs'
import { map, compose, throttle } from '../src/pew.mjs'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import sinon, { spy } from 'sinon'
import React from 'react'

describe('bind', () => {
  context('basic functionality', () => {
    it('should export a function', () => {
      expect(bind).to.be.a('function')
    })

    it('should return a function', () => {
      expect(bind()).to.be.a('function')
    })
  })

  context('simple React component tests', () => {
    const Test = () => React.createElement('div', null)

    it('should return a wrapped React component', () => {
      const Bound = bind()(Test)
      const wrapper = shallow(React.createElement(Bound, null))

      expect(wrapper).not.to.be.a('null')
    })

    it('should have the wrapped element', () => {
      const Bound = bind()(Test)
      const wrapper = shallow(React.createElement(Bound, null))

      expect(wrapper.find(Test)).not.to.be.a('null')
    })

    it('should call mapStateToProps with initial state', () => {
      const mapStateToProps = new spy()
      const initialState = { hello: 'world' }
      const Bound = bind(mapStateToProps, null, initialState)(Test)

      shallow(React.createElement(Bound, null))

      sinon.assert.calledOnce(mapStateToProps)
      sinon.assert.calledWith(mapStateToProps, initialState)
    })

    it('should set prop from mapStateToProps', () => {
      const mapStateToProps = state => ({ myProp: state.hello })
      const initialState = { hello: 'world' }
      const Bound = bind(mapStateToProps, null, initialState)(Test)
      const wrapper = shallow(React.createElement(Bound, null))

      expect(wrapper.find(Test).props()).to.include({ myProp: 'world' })
    })

    it('should change state when prop called correctly', () => {
      const mapStateToProps = state => ({ myProp: state.hello })
      const mapSetStateToProps = setState => ({
        setHello: newHello => setState({ hello: newHello })
      })
      const Bound = bind(mapStateToProps, mapSetStateToProps)(Test)
      const wrapper = shallow(React.createElement(Bound, null))
      const expected = 'expected new value'

      wrapper.find(Test).prop('setHello')(expected)
      wrapper.update()

      expect(wrapper.find(Test).prop('myProp')).to.eql(expected)
    })
  })

  context('usage with compose', () => {
    const Test = () => React.createElement('div', null)
    const mapStateToProps = state => ({ myProp: state.hello })
    const mapHello = map(hello => ({ hello }))

    it('should work fine with mapSetStateToProps', () => {
      const mapSetStateToProps = setState => ({
        setHello: compose(mapHello, setState)
      })
      const Bound = bind(mapStateToProps, mapSetStateToProps)(Test)
      const wrapper = shallow(React.createElement(Bound, null))
      const expected = 'expected new value'

      wrapper.find(Test).prop('setHello')(expected)
      wrapper.update()

      expect(wrapper.find(Test).prop('myProp')).to.eql(expected)
    })

    it('should throttle values fine', () => {
      const mapSetStateToProps = setState => ({
        setHello: compose(throttle(10), mapHello, setState)
      })
      const Bound = bind(mapStateToProps, mapSetStateToProps)(Test)
      const wrapper = shallow(React.createElement(Bound, null))
      const expected = 'expected new value'
      const setHello = wrapper.find(Test).prop('setHello')

      setHello(expected)
      wrapper.update()
      setHello('something else')
      wrapper.update()

      expect(wrapper.find(Test).prop('myProp')).to.eql(expected)
    })

    it('should compose the setState as well', async () => {
      const callAfterSetState = new spy()
      const mapSetStateToProps = setState => ({
        setHello: compose(mapHello, setState, callAfterSetState)
      })
      const Bound = bind(mapStateToProps, mapSetStateToProps)(Test)
      const wrapper = shallow(React.createElement(Bound, null))
      const expected = 'expected new value'
      const setHello = wrapper.find(Test).prop('setHello')

      sinon.assert.notCalled(callAfterSetState)
      await setHello(expected)
      wrapper.update()

      sinon.assert.calledOnce(callAfterSetState)
      sinon.assert.calledWith(callAfterSetState, { hello: expected })

      expect(wrapper.find(Test).prop('myProp')).to.eql(expected)
    })
  })
})
