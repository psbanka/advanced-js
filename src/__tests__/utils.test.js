import {makeKey} from '../utils'

/* global describe it expect */

describe('makeKey', () => {
  it('can make a key', () => {
    let output = makeKey('foo', 'bar')
    expect(output).toEqual('foo-bar')
  })
})
