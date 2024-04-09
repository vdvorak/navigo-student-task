import { makeAutoObservable, toJS } from "mobx"
import { getPropertyValue, isEqual, setPropertyValue } from "../utils/ObjectUtils"


export class MobxStore {
  constructor(data) {
    /**
     * @type {boolean}
     * @private
   */
    this._loaded = false

    /**
 * @type {boolean}
 * @private
*/
    this._isDirty = false

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

    makeAutoObservable(this)

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
   * Method to get deep copy of data.
   * @returns {object}
   */
  getData() {
    return structuredClone(toJS(this._data))
  }

 /**
   * Method to check if value of property is not same as default value.
   * @param {import("../typedef").PropertyPath} path
   * @returns {boolean}
   */
 isChanged(path) {
  const value = JSON.stringify(this.getValue(path))
  const defaultValue = JSON.stringify(this.getDefaultValue(path))

  return !isEqual(value, defaultValue)
}

/**
 * Method to check if store contains any change.
 * @returns {boolean}
 */
isDirty() {
  const data = JSON.stringify(this._data)
  const defaultData = JSON.stringify(this._defaultData)

  return !isEqual(data, defaultData)
}
}
