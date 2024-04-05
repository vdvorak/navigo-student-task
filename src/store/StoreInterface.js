/**
 * @typedef {(string | number)[]} PropertyPath
*/

export class StoreInterface {

  /**
   * Method to get property value.
   * @param {PropertyPath} path
   */
  getValue(path) {
    throw "Not implemented!"
  }


  /**
* Method to get property default value.
* @param {PropertyPath} path
*/
  getDefaultValue(path) {
    throw "Not implemented!"
  }


  /**
   * Method to set property value.
   * @param {PropertyPath} path
   * @param {any} value
   */
  setValue(path, value) {
    throw "Not implemented!"
  }

  /**
   * Method to get deep copy data.
   */
  getData() {
    throw "Not implemented!"
  }

  /**
   * Method to check if value of property is not same as default value.
   * @param {PropertyPath} path
   * @returns {boolean}
   */
  isChanged(path) {
    throw "Not implemented!"
  }

  /**
   * Method to check if store contains any change.
   * @returns {boolean}
   */
  isDirty() {
    throw "Not implemented!"
  }
}
