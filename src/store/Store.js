import { canContinueAtPath, getPropertyValueByPath } from "../utils/ObjectUtils"
import { Validator } from "../utils/Validator"

/**
 * @typedef {(string | number)[]} PropertyPath
*/

export class Store {
  constructor(data) {
    /**
      * @type {object}
      * @private
    */
    this._data = structuredClone(data)

    /**
      * @type {object}
      * @private
    */
    this._defaultData = structuredClone(data)
  }

  /**
   * Method to get property value.
   * @param {PropertyPath} path
   */
  getValue(path) {
    return getPropertyValueByPath(path, this._data)
  }


  /**
* Method to get property default value.
* @param {PropertyPath} path
*/
  getDefaultValue(path) {
    return getPropertyValueByPath(path, this._defaultData)
  }


  /**
   * Method to set property value.
   * @param {PropertyPath} path
   * @param {any} value
   */
  setValue(path, value) {
    Validator.checkPath(path)

    const lastKey = path.at(-1)
    const pathWithoutLastKey = path.slice(0, path.length - 1)

    const propertyData = pathWithoutLastKey.reduce((dataObject, currentKey) => {
      if (canContinueAtPath(dataObject, currentKey)) {
        return dataObject[currentKey]
      }

      return dataObject
    }, this._data)

    propertyData[lastKey] = value
  }

  /**
   * Method to get deep copy data.
   */
  getData() {
    return structuredClone(this._data)
  }

  /**
   * Method to check if value of property is not same as default value.
   * @param {PropertyPath} path
   * @returns {boolean}
   */
  isChanged(path) {
    const value = JSON.stringify(this.getValue(path))
    const defaultValue = JSON.stringify(this.getDefaultValue(path))

    return value !== defaultValue
  }

  /**
   * Method to check if store contains any change.
   * @returns {boolean}
   */
  isDirty() {
    const data = JSON.stringify(this._data)
    const defaultData = JSON.stringify(this._defaultData)

    return data !== defaultData
  }
}
