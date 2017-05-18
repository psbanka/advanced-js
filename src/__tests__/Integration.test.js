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
    let wrapper

    beforeEach((done) => {
      wrapper = mount(<App />)
      setTimeout(() => {
        done()
      }, 50)
    })

    it('will render the right number of table rows without filtering', () => {
      expect(wrapper.find('.product').length).toBe(6)
    })

    it('will render fewer rows when filtering on in-stock items', () => {
      wrapper.find('#in-stock-checkbox').simulate('click', {target: {checked: true}})
      expect(wrapper.find('.product').length).toBe(4)
    })

    it('will properly filter inventory when typing in the search box', () => {
      wrapper.find('#in-stock-textbox').simulate('change', {target: {value: 'ball'}})
      expect(wrapper.find('.product').length).toBe(3)
    })

    it('will properly filter inventory when typing and checking stock', () => {
      wrapper.find('#in-stock-textbox').simulate('change', {target: {value: 'ball'}})
      wrapper.find('#in-stock-checkbox').simulate('click', {target: {checked: true}})
      expect(wrapper.find('.product').length).toBe(2)
    })
  })

  describe('checking product items', () => {
    let wrapper

    beforeEach((done) => {
      wrapper = mount(<App />)
      setTimeout(() => {
        done()
      }, 50)
    })

    it('renders zero when unchecked', () => {
      expect(wrapper.find('#total-box').text()).toBe('Total: $0')
    })

    it('puts the correct value when clicking once on iPhone', () => {
      wrapper.find('#electronics-iphone-5').simulate('click', {})
      expect(wrapper.find('#total-box').text()).toBe('Total: $399.99')
    })

    it('puts the correct value when clicking twice on iPhone', () => {
      wrapper.find('#electronics-iphone-5').simulate('click', {})
      wrapper.find('#electronics-iphone-5').simulate('click', {})
      expect(wrapper.find('#total-box').text()).toBe('Total: $0')
    })

    it('adds values together properly', () => {
      wrapper.find('#electronics-iphone-5').simulate('click', {})
      wrapper.find('#sporting-goods-basketball').simulate('click', {})
      expect(wrapper.find('#total-box').text()).toBe('Total: $429.98')
    })
  })

  describe('other UI elements are rendered on page', () => {
    let wrapper

    beforeEach((done) => {
      wrapper = mount(<App />)
      setTimeout(() => {
        done()
      }, 50)
    })

    it('a button bar exists', () => {
      expect(wrapper.find('#edit-button').exists()).toBe(true)
    })
  })

  describe('toggling edit mode', () => {
    let wrapper

    beforeEach((done) => {
      wrapper = mount(<App />)
      setTimeout(() => {
        done()
      }, 50)
    })

    it('will see a save button after pressing edit', (done) => {
      wrapper.find('#edit-button').simulate('click')
      setTimeout(() => {
        expect(wrapper.find('#save-button').exists()).toBe(true)
        done()
      }, 50)
    })

    it('will see a cancel button after pressing edit', (done) => {
      wrapper.find('#edit-button').simulate('click')
      setTimeout(() => {
        expect(wrapper.find('#cancel-button').exists()).toBe(true)
        done()
      }, 50)
    })

    it('will NOT see an edit button after pressing edit', (done) => {
      wrapper.find('#edit-button').simulate('click')
      setTimeout(() => {
        expect(wrapper.find('#edit-button').exists()).toBe(false)
        done()
      }, 50)
    })
  })

  describe('behavior while in edit mode', () => {
    let wrapper

    beforeEach((done) => {
      wrapper = mount(<App />)
      setTimeout(() => {
        wrapper.find('#edit-button').simulate('click')
        done()
      }, 50)
    })

    it('productRow price is input object', () => {
      wrapper.find('.price').forEach((priceBox) => {
        expect(priceBox.type()).toBe('input')
      })
    })

    it('baseball price input exists and has the right value', () => {
      const input = wrapper.find('#sporting-goods-baseball-input')
      expect(input.exists()).toBe(true)
      expect(input.props().value).toBe(9.99)
    })

    it('will update the value when changed', () => {
      const input = wrapper.find('#sporting-goods-baseball-input')
      input.simulate('change', {target: {value: '10.99'}})
      expect(input.props().value).toBe(10.99)
    })
  })

  describe('behavior in leaving edit mode', () => {
    let wrapper

    beforeEach((done) => {
      wrapper = mount(<App />)
      setTimeout(() => {
        wrapper.find('#edit-button').simulate('click')
        done()
      }, 50)
    })

    it('changes back to span from inputs', () => {
      wrapper.find('#cancel-button').simulate('click')
      wrapper.find('.price').forEach((priceBox) => {
        expect(priceBox.type()).toBe('span')
      })
    })
  })

  describe('complete edit and save', () => {
    let wrapper

    beforeEach((done) => {
      wrapper = mount(<App />)
      setTimeout(() => {
        wrapper.find('#edit-button').simulate('click')
        done()
      }, 50)
    })

    it('changes to edit and updates the value and sends to server', () => {
      // I assume there is an input box with id=baseball-input and
      // that it can receive events to update it
      wrapper.find('#sporting-goods-baseball-input').simulate('change', {target: {value: '9999.32'}})
      wrapper.find('#save-button').simulate('click')
      expect(wrapper.find('#save-status').text()).toBe('Saved')
    })
  })
})
