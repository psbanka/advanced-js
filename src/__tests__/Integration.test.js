import React from 'react'
import ReactDOM from 'react-dom'
import App from '../App'
import { mount } from 'enzyme'

/* global it describe expect beforeEach */

describe('integration test', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<App />, div)
  })

  describe('when filtering products', () => {
    let app

    beforeEach(() => {
      app = mount(<App />)
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

    beforeEach(() => {
      app = mount(<App />)
    })

    it('renders zero when unchecked', () => {
      expect(app.find('#total-box').text()).toBe('Total: $0')
    })

    it('puts the correct value when clicking once on iPhone', () => {
      app.find('#electronics-iphone-5').simulate('click', {})
      expect(app.find('#total-box').text()).toBe('Total: $399.99')
    })

    it('puts the correct value when clicking twice on iPhone', () => {
      app.find('#electronics-iphone-5').simulate('click', {})
      app.find('#electronics-iphone-5').simulate('click', {})
      expect(app.find('#total-box').text()).toBe('Total: $0')
    })

    it('adds values together properly', () => {
      app.find('#electronics-iphone-5').simulate('click', {})
      app.find('#sporting-goods-basketball').simulate('click', {})
      expect(app.find('#total-box').text()).toBe('Total: $429.98')
    })
  })
})
