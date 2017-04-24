/**
 * converts category and name to a valid key string
 * @param {String} category - the name of the category
 * @param {String} name - the name of the string
 * @returns {String} - valid HTML id
 */
export function makeKey (category, name) {
  const convertedCategory = category.toLowerCase().replace(/ /g, '-')
  const convertedName = name.toLowerCase().replace(/ /g, '-')
  return `${convertedCategory}-${convertedName}`
}
