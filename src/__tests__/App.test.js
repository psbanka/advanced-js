import React from 'react'
import ReactDOM from 'react-dom'
import App from '../App'
import { shallow, mount, render } from 'enzyme'


/* global it describe */

describe('integration test', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<App />, div)
  })

  describe('when filtering products', () => {
    let app

    beforeEach(() => {
      app = mount(<App/>)
    })

    it('will render the right number of table rows without filtering', () => {
      expect(app.find('tr').length).toBe(9)
    })

    it('will render fewer rows when filtering on in-stock items', () => {
      app.find('#in-stock-checkbox').simulate('click', {target: {checked: true}})
      expect(app.find('tr').length).toBe(7)
    })

    it('will properly filter inventory when typing in the search box', () => {
      app.find('#in-stock-textbox').simulate('change', {target: {value: 'ball'}})
      expect(app.find('tr').length).toBe(6)
    })

    it('will properly filter inventory when typing and checking stock', () => {
      app.find('#in-stock-textbox').simulate('change', {target: {value: 'ball'}})
      app.find('#in-stock-checkbox').simulate('click', {target: {checked: true}})
      expect(app.find('tr').length).toBe(5)
    })
  })

  describe('checking product items', () => {
    let app

    beforeEach(() => {
      app = mount(<App/>)
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
