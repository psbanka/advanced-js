import React from 'react'
import App from '../App'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import {FAKE_SERVER_DATA} from '../test-data'
import {makeKey} from '../utils'

import fetch from 'jest-fetch-mock'
global.fetch = fetch

/* global it describe expect beforeEach */

describe('App', () => {
  it('does a snapshot check', () => {
    const component = renderer.create(<App />)
    const json = component.toJSON()
    expect(json).toMatchSnapshot()
  })

  describe('callbacks', () => {
    let wrapper, app

    describe('SearchBox callbacks', () => {
      fetch.mockResponseOnce(JSON.stringify(FAKE_SERVER_DATA))
      beforeEach(() => {
        wrapper = shallow(<App />)
        app = wrapper.instance()
      })

      it('properly performs onFilterTextInput', () => {
        app.onFilterTextInput({target: {value: 'cheese'}})
        expect(wrapper.state().searchTerm).toBe('cheese')
      })

      it('properly performs onFilterCheckboxInput', () => {
        app.onFilterCheckBoxInput({target: {checked: true}})
        expect(wrapper.state().inStock).toBe(true)
      })
    })

    describe('onIsBuying', () => {
      beforeEach(() => {
        fetch.mockResponseOnce(JSON.stringify(FAKE_SERVER_DATA))
        wrapper = shallow(<App />)
        app = wrapper.instance()
      })

      it('properly increments price', () => {
        wrapper.setState({
          total: 0,
          isBuying: {}
        })
        app.onIsBuying('product1', 299.99)
        const expected = {product1: true}
        expect(app.state.isBuying).toEqual(expected)
        expect(app.state.total).toEqual(299.99)
      })

      it('properly decrements price', () => {
        wrapper.setState({
          total: 299.99,
          isBuying: {product1: true}
        })
        app.onIsBuying('product1', 299.99)
        const expected = {product1: false}
        expect(app.state.isBuying).toEqual(expected)
        expect(app.state.total).toEqual(0)
      })
    })

    describe('onPriceEdit', () => {
      beforeEach((done) => {
        fetch.mockResponseOnce(JSON.stringify(FAKE_SERVER_DATA))
        wrapper = shallow(<App />)
        setTimeout(() => {
          app = wrapper.instance()
          done()
        }, 50)
      })

      it('will update the new value in editingCatalog', () => {
        app.onEditToggle()
        app.onPriceEdit('sporting-goods-football', 29.99)
        const actualEntry = wrapper.state('editingCatalog').find((item) => {
          let key = makeKey(item)
          console.log('key:', key, 'makeKey(item)', makeKey(item))
          return key === 'sporting-goods-football'
        })
        // actualEntry = {category: 'Sporting Goods', price: 49.99, stocked: true, name: 'Football'},
        expect(actualEntry.price).toBe(29.99)
      })
    })

    describe('onEditToggle', () => {
      beforeEach((done) => {
        fetch.mockResponseOnce(JSON.stringify(FAKE_SERVER_DATA))
        wrapper = shallow(<App />)
        setTimeout(() => {
          app = wrapper.instance()
          done()
        }, 50)
      })

      it('actually toggles state', () => {
        wrapper.setState({isEditing: false})
        app.onEditToggle()
        expect(app.state.isEditing).toBe(true)
      })

      it('actually creates new editable catalog', () => {
        wrapper.setState({isEditing: false})
        app.onEditToggle()
        expect(wrapper.state('editingCatalog')).toEqual(wrapper.state('catalog'))
        expect(wrapper.state('editingCatalog')).not.toBe(wrapper.state('catalog'))
        wrapper.state('editingCatalog')[0].price = 5.00
        expect(wrapper.state('catalog')[0].price).not.toEqual(5.00)
      })
    })

    describe('onSave', () => {
      let wrapper, app

      beforeEach((done) => {
        const editingCatalog = [{category: 'Sporting Goods', price: 19.99, stocked: true, name: 'Football'}]
        const catalog = [{category: 'Sporting Goods', price: 39.99, stocked: true, name: 'Football'}]
        fetch.mockResponseOnce(JSON.stringify(catalog))
        fetch.mockResponseOnce(JSON.stringify(editingCatalog))
        wrapper = shallow(<App />)
        wrapper.setState({
          isEditing: true,
          editingCatalog,
          catalog
        })
        app = wrapper.instance()
        app.onSave()
        setTimeout(() => {
          done()
        }, 50)
      })

      it('hits the API and optimistically saves', () => {
        expect(wrapper.state('catalog')[0].price).toBe(19.99)
      })

      it('pops a message that saving is successful', () => {
        const messageBox = wrapper.find('#message-box')
        expect(messageBox.node.props.children.props.children).toEqual('Saved.')
      })
    })
  })
})
