import { autorun, makeAutoObservable, observable, toJS } from "mobx"
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
    this._dirty = false

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

    makeAutoObservable(this, { _data: observable, _loaded: observable, _dirty: observable })

    setTimeout(() => {
      this._loaded = true
    }, 600);

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
    this._checkDirty()
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
    const value = this.getValue(path)
    const defaultValue = this.getDefaultValue(path)

    return !isEqual(value, defaultValue)
  }

  /**
   * Method to check if store contains any change.
   * @returns {boolean}
   * @private
   */
  _checkDirty() {
    const data = this._data
    const defaultData = this._defaultData

    this._dirty = !isEqual(data, defaultData)
  }

  get isDirty() {
    return this._dirty
  }

  get isLoaded() {
    return this._loaded
  }
}
