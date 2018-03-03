import { compose, map, tap, createStream } from '../src/pew.mjs'
import { expect } from 'chai'
import sinon, { spy } from 'sinon'

describe('compose', () => {
  it('should export a function', () => {
    expect(compose).to.be.a('function')
  })

  it('should pass value to function and return the result', () => {
    expect(compose(Math.abs)(-10)).to.eql(10)
  })

  it('should pass multiple return values as next argument', () => {
    const add10 = num => num + 10
    const multiply3 = num => num * 3

    expect(compose(add10, multiply3)(5)).to.eql(25)
    expect(compose(add10, multiply3)(5)).to.eql(add10(multiply3(5)))
  })

  it('should handle functions with callbacks', () => {
    const emitOne = cb => cb(1)
    const add10 = cb => value => cb(value + 10)
    const multiply3 = cb => value => cb(value * 3)
    const spyValue = new spy()

    compose(emitOne, add10, multiply3)(spyValue)

    sinon.assert.calledWith(spyValue, 33)
  })

  it('should handle async functions', async () => {
    const emitOne = cb => cb(1)
    const add10 = async value => value + 10
    const multiply3 = async value => value * 3
    const spyValue = new spy()

    await compose(emitOne, add10, multiply3)(spyValue)

    sinon.assert.calledWith(spyValue, 33)
  })
})

describe('createStream', () => {
  it('should export a function', () => {
    expect(createStream).to.be.a('function')
  })

  it('should create a simple stream where you can emit stuff', () => {
    const spyValue = new spy()
    const onEmit = createStream(tap(spyValue))

    onEmit(2)
    onEmit(10)

    sinon.assert.calledWith(spyValue.firstCall, 2)
    sinon.assert.calledWith(spyValue.secondCall, 10)
  })

  it('should allow mutating the emitted values', () => {
    const spyValue = new spy()
    const add10 = num => num + 10
    const multiply4 = num => num * 4
    const onEmit = createStream(map(add10), map(multiply4), tap(spyValue))

    onEmit(3)

    sinon.assert.calledWith(spyValue, 52)
  })
})

describe('tap', () => {
  it('should export a function', () => {
    expect(tap).to.be.a('function')
  })

  it('should call the callback without changing value', async () => {
    const initialValue = 'hello world'
    const emitInitialValue = cb => cb(initialValue)
    const otherValue = 'other value'
    const changeValue = new spy(() => otherValue)
    const afterTap = new spy()

    compose(emitInitialValue, tap(changeValue))(afterTap)
    sinon.assert.calledWith(changeValue, initialValue)
    sinon.assert.calledWith(afterTap, initialValue)
  })
})
