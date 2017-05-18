/**
 * converts category and name to a valid key string
 * @param {CatalogItem} item - an item from our catalog
 * @returns {String} - valid HTML id
 */
export function makeKey (item) {
  const convertedCategory = item.category.toLowerCase().replace(/ /g, '-')
  const convertedName = item.name.toLowerCase().replace(/ /g, '-')
  return `${convertedCategory}-${convertedName}`
}
