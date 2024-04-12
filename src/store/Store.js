import Cop from "../utils/Cop"
import { getPropertyValue, isEqual, setPropertyValue } from "../utils/ObjectUtils"

export class Store {
  /**
   *
   * @param {object} data
   */
  constructor(data) {
    Cop.isA(data, Object)

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
   * @param {import("../typedef").PropertyPath} path
   */
  getValue(path) {
    return getPropertyValue(path, this._data)
  }

  /**
   * Method to get property default value.
   * @param {import("../typedef").PropertyPath} path
   */
  getDefaultValue(path) {
    return getPropertyValue(path, this._defaultData)
  }

  /**
   * Method to set property value.
   * @param {import("../typedef").PropertyPath} path
   * @param {any} value
   */
  setValue(path, value) {
    setPropertyValue(path, value, this._data)
  }

  /**
   * Method mark current state as default.
   */
  markCurrentStateAsDefault() {
    this._defaultData = structuredClone(this._data)
  }

  /**
   * Method to get deep copy of data.
   * @returns {object}
   */
  getData() {
    return structuredClone(this._data)
  }

  /**
   * Method to check if value of property is not same as default value.
   * @param {import("../typedef").PropertyPath} path
   * @returns {boolean}
   */
  isChanged(path) {
    const value = this.getValue(path)
    const defaultValue = this.getDefaultValue(path)

    return !isEqual(value, defaultValue)
  }

  /**
   * Method to check if store contains any change.
   * @returns {boolean}
   */
  isDirty() {
    const data = this._data
    const defaultData = this._defaultData

    return !isEqual(data, defaultData)
  }
}
