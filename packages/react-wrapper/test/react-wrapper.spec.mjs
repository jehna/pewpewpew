import { bind } from '../src/react-wrapper.mjs'
import { map, tap, createStream, throttle } from '@pewpewpew/core'
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

    it('should call mapSetStateToProps', () => {
      const mapSetStateToProps = new spy(() => {})
      const initialState = { hello: 'world' }
      const Bound = bind(mapSetStateToProps, initialState)(Test)

      shallow(React.createElement(Bound, null))

      sinon.assert.calledOnce(mapSetStateToProps)
    })

    it('should set prop from initial state', () => {
      const initialState = { hello: 'world' }
      const Bound = bind(() => ({}), initialState)(Test)
      const wrapper = shallow(React.createElement(Bound, null))

      expect(wrapper.find(Test).props()).to.include(initialState)
    })

    it('should change state when prop called correctly', () => {
      const mapSetStateToProps = setState => ({
        setHello: hello => setState({ hello })
      })
      const Bound = bind(mapSetStateToProps)(Test)
      const wrapper = shallow(React.createElement(Bound, null))
      const expected = 'expected new value'

      wrapper.find(Test).prop('setHello')(expected)
      wrapper.update()

      expect(wrapper.find(Test).prop('hello')).to.eql(expected)
    })
  })

  context('usage with createStream', () => {
    const Test = () => React.createElement('div', null)
    const mapHello = map(hello => ({ hello }))

    it('should work fine with mapSetStateToProps', () => {
      const mapSetStateToProps = setState => ({
        setHello: createStream(mapHello, setState)
      })
      const Bound = bind(mapSetStateToProps)(Test)
      const wrapper = shallow(React.createElement(Bound, null))
      const expected = 'expected new value'

      wrapper.find(Test).prop('setHello')(expected)
      wrapper.update()

      expect(wrapper.find(Test).prop('hello')).to.eql(expected)
    })

    it('should throttle values fine', () => {
      const mapSetStateToProps = setState => ({
        setHello: createStream(throttle(10), mapHello, setState)
      })
      const Bound = bind(mapSetStateToProps)(Test)
      const wrapper = shallow(React.createElement(Bound, null))
      const expected = 'expected new value'
      const setHello = wrapper.find(Test).prop('setHello')

      setHello(expected)
      wrapper.update()
      setHello('something else')
      wrapper.update()

      expect(wrapper.find(Test).prop('hello')).to.eql(expected)
    })

    it('should compose the setState as well', async () => {
      const callAfterSetState = new spy()
      const mapSetStateToProps = setState => ({
        setHello: createStream(mapHello, setState, tap(callAfterSetState))
      })
      const Bound = bind(mapSetStateToProps)(Test)
      const wrapper = shallow(React.createElement(Bound, null))
      const expected = 'expected new value'
      const setHello = wrapper.find(Test).prop('setHello')

      sinon.assert.notCalled(callAfterSetState)
      await setHello(expected)
      wrapper.update()

      sinon.assert.calledOnce(callAfterSetState)
      sinon.assert.calledWith(callAfterSetState, { hello: expected })

      expect(wrapper.find(Test).prop('hello')).to.eql(expected)
    })
  })
})
