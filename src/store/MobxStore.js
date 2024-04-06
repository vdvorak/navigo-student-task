import { makeAutoObservable, toJS } from "mobx"
import { Store } from "./Store"


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

    this._store = new Store(data, (dataProxy) => structuredClone(toJS(dataProxy)))

    makeAutoObservable(this)
    makeAutoObservable(this._store)

  }

  /**
   * Method to get property value.
   * @param {import("../typedef").PropertyPath} path
   */
  getValue(path) {
    return this._store.getValue(path)
  }


  /**
* Method to get property default value.
* @param {import("../typedef").PropertyPath} path
*/
  getDefaultValue(path) {
    return this._store.getDefaultValue(path)
  }


  /**
   * Method to set property value.
   * @param {import("../typedef").PropertyPath} path
   * @param {any} value
   */
  setValue(path, value) {
    this._store.setValue(path, value)
  }

  /**
   * Method to get deep copy of data.
   * @returns {object}
   */
  getData() {
    return this._store.getData()
  }

  /**
   * Method to check if value of property is not same as default value.
   * @param {import("../typedef").PropertyPath} path
   * @returns {boolean}
   */
  isChanged(path) {
    return this._store.isChanged(path)
  }
}
