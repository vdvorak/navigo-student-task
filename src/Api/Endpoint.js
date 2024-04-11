export default class Endpoint {
  constructor(method, inputType, outputType) {
    /**
     * @type {string}
     * @private
     */
    this._method = method
    /**
     * @type {object}
     * @private
     */
    this._inputType = inputType
    /**
     * @type {object}
     * @private
     */
    this._outputType = outputType
  }

  /**
   * @returns
   */
  get method() {
    return this._method
  }

  /**
   * @returns {object} Input data structure def
   */
  get inputType() {
    return this._inputType
  }

  /**
   * @returns {object} Output data structure def
   */
  get outputType() {
    return this._outputType
  }
}
