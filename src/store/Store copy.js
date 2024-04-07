
export class Store {




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
