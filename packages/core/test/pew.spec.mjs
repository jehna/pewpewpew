import { compose, map, tap } from '../src/pew.mjs'
import { expect } from 'chai'
import sinon, { spy } from 'sinon'

describe('compose', () => {
  it('should export a function', () => {
    expect(compose).to.be.a('function')
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

    compose(emitInitialValue, tap(changeValue), afterTap)
    sinon.assert.calledWith(changeValue, initialValue)
    sinon.assert.calledWith(afterTap, initialValue)
  })
})
