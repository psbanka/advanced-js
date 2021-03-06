import React from 'react'
import ProductRow from '../ProductRow'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'

/* global it describe expect jest beforeEach */

describe('ProductRow', () => {
  it('does a snapshot check', () => {
    const component = renderer.create(
      <ProductRow
        currentCategory='electronics'
        category='electronics'
        name='iphone 6'
        price={121}
        stocked
        inStock
        isBuying={{}}
        searchTerm=''
        onIsBuying={jest.fn()}
      />
    )
    const json = component.toJSON()
    expect(json).toMatchSnapshot()
  })

  describe('handlePriceEdit', () => {
    let callback, wrapper, productRow

    beforeEach(() => {
      callback = jest.fn()
      wrapper = shallow(
        <ProductRow
          currentCategory='electronics'
          category='electronics'
          name='iphone 6'
          price={121}
          stocked
          inStock
          isBuying={{}}
          searchTerm=''
          onIsBuying={() => {}}
          onPriceEdit={callback}
        />
      )
      productRow = wrapper.instance()
    })

    it('properly calls upstream callback', () => {
      productRow.handlePriceEdit({target: {value: '10.01'}})
      expect(callback.mock.calls).toEqual([['electronics-iphone-6', 10.01]])
    })
  })

  describe('handle onGetDetails', () => {
    let callback, wrapper
    beforeEach(() => {
      callback = jest.fn()
      wrapper = shallow(
        <ProductRow
          currentCategory='electronics'
          category='electronics'
          name='iphone 6'
          price={121}
          stocked
          inStock
          isBuying={{}}
          searchTerm=''
          onGetDetails={callback}
        />
      )
      wrapper.find('tr').simulate('click')
    })

    it('properly calls upstream callback', () => {
      expect(callback.mock.calls).toEqual([[]])
    })
  })

  describe('handleOnIsBuying', () => {
    it('properly calls upstream callback', () => {
      const callback = jest.fn()
      const wrapper = shallow(
        <ProductRow
          currentCategory='electronics'
          category='electronics'
          name='iphone 6'
          price={121}
          stocked
          inStock
          isBuying={{}}
          searchTerm=''
          onIsBuying={callback}
        />
      )
      const productRow = wrapper.instance()
      productRow.handleOnIsBuying({})
      expect(callback.mock.calls).toEqual([['electronics-iphone-6', 121]])
    })
  })

  describe('render', () => {
    it('creates the correct id in each row', () => {
      const wrapper = shallow(
        <ProductRow
          currentCategory='electronics'
          category='electronics'
          name='iphone 6'
          price={121}
          stocked
          inStock
          isBuying={{}}
          searchTerm=''
        />
      )
      const expected = 'electronics-iphone-6-row'
      expect(wrapper.find('tr').node.props.id).toEqual(expected)
    })

    it('performs basic callback functionality', () => {
      const callback = jest.fn()
      const wrapper = shallow(
        <ProductRow
          currentCategory='electronics'
          category='electronics'
          name='iphone 6'
          price={121}
          stocked
          inStock
          isBuying={{}}
          searchTerm=''
          onIsBuying={callback}
        />
      )
      const inputObject = wrapper.find('Button')
      expect(inputObject.length).toBe(1)
      inputObject.simulate('click', {})
      expect(callback.mock.calls).toEqual([['electronics-iphone-6', 121]])
    })

    it('does not render if filtered out', () => {
      const wrapper = shallow(
        <ProductRow
          currentCategory='electronics'
          category='electronics'
          name='iphone 6'
          price={121}
          stocked
          inStock
          isBuying={{}}
          searchTerm='foo'
          onIsBuying={jest.fn()}
        />
      )
      const inputObject = wrapper.find('input')
      expect(inputObject.length).toBe(0)
    })

    it('does not render if not in stock and searching for stocked items', () => {
      const wrapper = shallow(
        <ProductRow
          currentCategory='electronics'
          category='electronics'
          name='iphone 6'
          price={121}
          stocked={false}
          inStock
          isBuying={{}}
          searchTerm=''
          onIsBuying={jest.fn()}
        />
      )
      const inputObject = wrapper.find('input')
      expect(inputObject.length).toBe(0)
    })

    it('renders with red styling if out of stock', () => {
      const wrapper = shallow(
        <ProductRow
          currentCategory='electronics'
          category='electronics'
          name='iphone 6'
          price={121}
          stocked={false}
          inStock={false}
          isBuying={{}}
          searchTerm=''
          onIsBuying={jest.fn()}
        />
      )
      const inputObject = wrapper.find('.product')
      expect(inputObject.node.props.style.color).toBe('red')
    })

    it('renders with black styling if in stock', () => {
      const wrapper = shallow(
        <ProductRow
          currentCategory='electronics'
          category='electronics'
          name='iphone 6'
          price={121}
          stocked
          inStock={false}
          isBuying={{}}
          searchTerm=''
          onIsBuying={jest.fn()}
        />
      )
      const inputObject = wrapper.find('.product')
      expect(inputObject.node.props.style.color).toBe('black')
    })
  })
})
