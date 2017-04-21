import React from 'react'
import ReactDOM from 'react-dom'
import ProductRow, {makeKey} from '../ProductRow'
import { shallow, mount, render } from 'enzyme'
import renderer from 'react-test-renderer';

/* gloabl it describe */

describe('makeKey', () => {
  it('can make a key', () => {
    let output = makeKey('foo', 'bar')
    expect(output).toEqual('foo-bar')
  })
})

describe('ProductRow', () => {
  it('does a snapshot check', () => {
    const component = renderer.create(
      <ProductRow
        currentCategory='electronics'
        category='electronics'
        name='iphone 6'
        price={121}
        stocked={true}
        inStock={true}
        isBuying={{}}
        searchTerm=''
        onIsBuying={{}}
      />
    )
    const json = component.toJSON()
    expect(json).toMatchSnapshot()
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
          stocked={true}
          inStock={true}
          isBuying={{}}
          searchTerm=''
          onIsBuying={callback}
        />
      )
      const productRow = wrapper.instance()
      productRow.handleOnIsBuying({target: {checked: true}})
      expect(callback.mock.calls).toEqual([['electronicsiphone 6', true, 121]])
    })
  })

  describe('render', () => {
    it('performs basic callback functionality', () => {
      const callback = jest.fn()
      const wrapper = shallow(
        <ProductRow
          currentCategory='electronics'
          category='electronics'
          name='iphone 6'
          price={121}
          stocked={true}
          inStock={true}
          isBuying={{}}
          searchTerm=''
          onIsBuying={callback}
        />
      )
      const inputObject = wrapper.find('input')
      expect(inputObject.length).toBe(1)
      inputObject.simulate('change', {target: {checked: true}})
      expect(callback.mock.calls).toEqual([['electronicsiphone 6', true, 121]])
    })

    it('does not render if filtered out', () => {
      const wrapper = shallow(
        <ProductRow
          currentCategory='electronics'
          category='electronics'
          name='iphone 6'
          price={121}
          stocked={true}
          inStock={true}
          isBuying={{}}
          searchTerm='foo'
          onIsBuying={{}}
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
          inStock={true}
          isBuying={{}}
          searchTerm=''
          onIsBuying={{}}
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
          onIsBuying={{}}
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
          stocked={true}
          inStock={false}
          isBuying={{}}
          searchTerm=''
          onIsBuying={{}}
        />
      )
      const inputObject = wrapper.find('.product')
      expect(inputObject.node.props.style.color).toBe('black')
    })
  })
})
