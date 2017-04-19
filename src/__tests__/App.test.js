import React from 'react'
import ReactDOM from 'react-dom'
import App, {makeKey} from '../App'
import { shallow, mount, render } from 'enzyme'
import sinon from 'sinon';
import renderer from 'react-test-renderer';

/* global it describe */

describe('App unit test', () => {
  describe('onBuying', () => {
    it('adds a new value', () => {
      const app = shallow(<App />)
      app.instance().onIsBuying('foo', true, 100)
      // expect(app.state('isBuying')).toBe({foo: true})
      expect(app.state('isBuying')).toEqual({foo: true})
      expect(app.state('total')).toEqual(100)
    })
  })
})

describe('makeKey', () => {
  it('can make a key', () => {
    let output = makeKey('foo', 'bar')
    expect(output).toEqual('foo-bar')
  })
})
