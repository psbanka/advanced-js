import React from 'react'
import ReactDOM from 'react-dom'
import ProductRow from '../ProductRow'
import { shallow, mount, render } from 'enzyme'
import renderer from 'react-test-renderer';

/* gloabl it describe */

describe('ProductRow', () => {
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
      inputObject.simulate('change', {target: {checked: true}})
      expect(callback.mock.calls).toEqual([['electronicsiphone 6', true, 121]])
    })
  })
})
