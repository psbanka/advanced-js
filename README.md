# Getting started

## Basic work

### Get your environment working

- Install `nvm` - node version manager
- Install `node` version 6
- Install `create-react-app` globally using `npm` (or `yarn`)
- Scaffold your new app: https://facebook.github.io/react/docs/installation.html
- Edit `src/App.js` in your favorite editor

### Set up the static site
- Using the mockup in https://facebook.github.io/react/docs/thinking-in-react.html, build this in HTML statically. You can use this as a helpful starting-place:

```html
<div>
  <input placeholder="Search..."/>
  <p><input type='checkbox'/>Only show products in stock</p>
  <table>
    <thead>
      <tr><td>Name</td><td>Price</td></tr>
    </thead>
    <tbody>
      <tr><td colSpan={2}>Sporting Goods</td></tr>
      <tr><td>football</td><td>$49.99</td></tr>
      <tr><td colSpan={2}>Electronics</td></tr>
      <tr><td>ipad</td><td>$399.99</td></tr>
    </tbody>
  </table>
</div>
```

- Convert the static HTML into various components
 - SearchBox
 - ProductLine
 - ProductHeadline
 - ProductData

### Create the table programmatically

Use the JSON data to dynamically build your table:

```javascript
[
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];
```
- Pass this data as a property from `<App/>` all the way down to the components that need it.
- Use `PropTypes` in each component to indicate what data it expects to receive.
- Loop through this array to create Headlines for each major category of ProductData
- Loop through individual rows to display them under their categories
- Color out-of-stock items red

### Add interactivity

- Add `state` to `<App/>` which is the text typed in the search box.
- Pass that `state` to the `<SearchBox/>` component as a property and hook it into the `<input>` field
- Create a callback from `SearchBox` back to `App` when someone types in the input box to change the state
- Pass the search state information down into the table in order to dynamically filter it
- Do the same thing with the checkbox!

> don't forget to `.bind()` the callback so that you don't lose track of `this` !

## Advanced work (and things to think about)

- Split your application into individual module files. One React component per module (unless they are very small!)
- Pretend to load the data asynchronously from a server. Put a spinner in the display while the data is being loaded
- Use a React library to make your application more beautiful
 - http://www.material-ui.com/#/components/app-bar
 - https://react-bootstrap.github.io/components.html
- Research JSDoc (http://usejsdoc.org/). Add docblocks to each function with `@param` and `@returns` parameters for each.
- Add lint checking to your system: research `standard.js` and integrate lint checking into your editor!
