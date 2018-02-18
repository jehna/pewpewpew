import { compose } from '../src/pew.mjs'
import { expect } from 'chai'

describe('compose', () => {
  it('should export a function', () => {
    expect(compose).to.be.a('function')
  })
})
