import React from 'react'
import ReactDOM from 'react-dom'
import App from '../App'
import { mount } from 'enzyme'
import fetch from 'jest-fetch-mock'
import {FAKE_SERVER_DATA} from '../test-data'
global.fetch = fetch

/* global it describe expect beforeEach */

global.fetch.mockResponse(JSON.stringify(FAKE_SERVER_DATA))

describe('integration test', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<App />, div)
  })

  describe('when filtering products', () => {
    let app

    beforeEach((done) => {
      app = mount(<App />)
      setTimeout(() => {
        done()
      }, 50)
    })

    it('will render the right number of table rows without filtering', () => {
      expect(app.find('.product').length).toBe(6)
    })

    it('will render fewer rows when filtering on in-stock items', () => {
      app.find('#in-stock-checkbox').simulate('click', {target: {checked: true}})
      expect(app.find('.product').length).toBe(4)
    })

    it('will properly filter inventory when typing in the search box', () => {
      app.find('#in-stock-textbox').simulate('change', {target: {value: 'ball'}})
      expect(app.find('.product').length).toBe(3)
    })

    it('will properly filter inventory when typing and checking stock', () => {
      app.find('#in-stock-textbox').simulate('change', {target: {value: 'ball'}})
      app.find('#in-stock-checkbox').simulate('click', {target: {checked: true}})
      expect(app.find('.product').length).toBe(2)
    })
  })

  describe('checking product items', () => {
    let app

    beforeEach((done) => {
      app = mount(<App />)
      setTimeout(() => {
        done()
      }, 50)
    })

    it('renders zero when unchecked', () => {
      expect(app.find('#total-box').text()).toBe('0')
    })

    it('puts the correct value when clicking once on iPhone', () => {
      app.find('#electronics-iphone-5').simulate('change', {target: {checked: true}})
      expect(app.find('#total-box').text()).toBe('399.99')
    })

    it('puts the correct value when clicking twice on iPhone', () => {
      app.find('#electronics-iphone-5').simulate('change', {target: {checked: true}})
      app.find('#electronics-iphone-5').simulate('change', {target: {checked: false}})
      expect(app.find('#total-box').text()).toBe('0')
    })

    it('adds values together properly', () => {
      app.find('#electronics-iphone-5').simulate('change', {target: {checked: true}})
      app.find('#sporting-goods-basketball').simulate('change', {target: {checked: true}})
      expect(app.find('#total-box').text()).toBe('429.98')
    })
  })
})
