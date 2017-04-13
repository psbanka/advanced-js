import React from 'react'
import ReactDOM from 'react-dom'
import App from '../App'
import { shallow, mount, render } from 'enzyme'


/* global it */

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
})

it('will render the right number of table rows', () => {
  const wrapper = mount(<App/>)
  expect(wrapper.find('tr').length).toBe(9)
})
