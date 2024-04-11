import Validator from "../utils/Validator"

/**
 * @class Utility class with validation functions for api methods.
 */
export default class ApiValidator {
  constructor() {
    /**
     * @type {Map<string, Array<{severity:(ERROR|WARNING), message:string>}>}
     */
    this._validation = []
  }

  /**
   *
   * @param {import("../typedef").PropertyPath} path path of property to add validation error to
   * @param {string} message error message
   */
  _addError(path, message) {
    Validator.checkPath(path)
    const pathStr = path.join(";")
    if (!this._validation.has(pathStr)) {
      this._validation.set(pathStr, [])
    }

    this._validation.get(pathStr).push({ severity: "ERROR", message })
  }

  /**
   * Checks if object is not null or undefined.
   * @param {object} object - Tested object
   * @param {string} message - Optional error message
   * @returns {void}
   */
  checkSet(path, object, message = undefined) {
    if (object === null || object === undefined) {
      this._addError(path, message ?? "Value is null/undefined")
    }
  }

  /**
   * Checks if object is null or undefined.
   * @param {object} object - Tested object
   * @param {string} message - Optional error message
   * @returns {void}
   */
  checkNotSet(object, message = undefined) {
    if (object !== null && object !== undefined) {
      this._addError(path, message ?? "Value should be null/undefined but it is set to value")
    }
  }

  /**
   * Checks if expression is true.
   * @param {any} object - Tested object
   * @param {string} message - Optional error message
   * @returns {void}
   */
  checkTrue(bool, message = undefined) {
    if (bool !== true) {
      this._addError(path, message || `True expected, got ${bool}`)
    }
  }

  /**
   * Checks if object is a string and is not blank.
   * @param {any} object - Tested object
   * @param {string} message - Optional error message
   * @returns {void}
   */
  checkNotBlank(object, message = undefined) {
    Validator.isA(object, String)

    if (object === null || object === undefined || object.length < 1) {
      this._addError(path, message ?? "Value should not be blank")
    }
  }

  /**
   * Checks if number is greater than other.
   * @param {Number} number - Tested number
   * @param {Number} ref - Expected greater number
   * @param {string} message - Optional error message
   * @returns {void}
   */
  checkGreaterThan(number, ref, message = undefined) {
    Validator.isA(number, Number)
    Validator.isA(ref, Number)

    if (number <= ref) {
      this._addError(path, message || `Expected positive number greather than ${ref} but got ${number}`)
    }
  }

  /**
   * Checks if number is lower than other.
   * @param {Number} number - Tested number
   * @param {Number} ref - Expected lower number
   * @param {string} message - Optional error message
   * @returns {void}
   */
  checkLessThan(number, ref, message = undefined) {
    Validator.isA(number, Number)
    Validator.isA(ref, Number)

    if (number >= ref) {
      this._addError(path, message || `Expected positive number lesser than ${ref} but got ${number}`)
    }
  }

  /**
   * Checks if two values are equal or objects has same reference.
   * @param {any} value - Tested value
   * @param {any} ref - Other value
   * @param {string} message - Optional error message
   * @returns {void}
   */
  checkEquals(value, ref, message = undefined) {
    if (value !== ref) {
      this._addError(path, message || `Expected same values but got '${value}' and '${ref}'`)
    }
  }

  /**
   * Checks if array contains value.
   * @param {Array} array - Tested array
   * @param {any} value - Expected value.
   * @param {string} message - Optional error message
   * @returns {void}
   */
  checkContained(array, value, message = undefined) {
    Validator.isA(array, Array)

    if (!array.includes(value)) {
      this._addError(path, message || `Value ${value} not found in array`)
    }
  }

  /**
   * Checks if array does not contain value.
   * @param {Array} array - Tested array
   * @param {any} value - Expected value.
   * @param {string} message - Optional error message
   * @returns {void}
   */
  checkNotContained(array, value, message = undefined) {
    Validator.isA(array, Array)

    if (array.includes(value)) {
      this._addError(path, message || `Value ${value} is already in array`)
    }
  }
}
