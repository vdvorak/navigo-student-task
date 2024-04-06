import { getAtPath } from "../utils/ObjectUtils"
import Validator from "../utils/Validator"

export class Store {
  /**
   * 
   * @param {object} data 
   */
  constructor(data, deepCopyFunction = structuredClone) {
    Validator.isA(data, Object)
    Validator.isFunctionWithArity(deepCopyFunction, 1)

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

    /**
    * @type {Function}
    * @private
   */
    this._deepCopyFunction = deepCopyFunction

  }

  /**
   * Method to get property value.
   * @param {import("../typedef").PropertyPath} path
   */
  getValue(path) {
    return getAtPath(path, this._data)
  }


  /**
* Method to get property default value.
* @param {import("../typedef").PropertyPath} path
*/
  getDefaultValue(path) {
    return getAtPath(path, this._defaultData)
  }


  /**
   * Method to set property value.
   * @param {import("../typedef").PropertyPath} path
   * @param {any} value
   */
  setValue(path, value) {
    const propertyName = path.at(-1)
    let entry = this._data

    if (path.length > 1) {
      const entryPath = path.slice(0, path.length - 1)
      entry = getAtPath(entryPath, this._data)
    }

    const prevValue = this._deepCopyFunction((entry[propertyName]))

    if (JSON.stringify(value) !== JSON.stringify(prevValue)) {
      entry[propertyName] = value
    }
  }

  /**
   * Method to get deep copy of data.
   * @returns {object}
   */
  getData() {
    return this._deepCopyFunction((this._data))
  }

  /**
   * Method to check if value of property is not same as default value.
   * @param {import("../typedef").PropertyPath} path
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
