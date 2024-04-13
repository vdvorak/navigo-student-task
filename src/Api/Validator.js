import Cop from "../utils/Cop"

export const SEVERITY_ERROR = "ERROR"
export const SEVERITY_WARNING = "WARNING"

export class Validator {
  constructor() {
    /**
     * @type {Map<string, Array<{severity:(SEVERITY_ERROR|SEVERITY_WARNING), message:string>}>}
     * @private
     */
    this._validation = []
  }

  /**
   * Method to get validation data and prevent from adding other validation
   * @returns {Map<string, Array<{severity:(SEVERITY_ERROR|SEVERITY_WARNING), message:string>}>}
   */
  getValidationData() {
    return Object.freeze(this._validation)
  }

  /**
   *
   * @param {import("../typedef").PropertyPath} path path of property to add validation error to
   * @param {(SEVERITY_ERROR|SEVERITY_WARNING)} severity
   * @param {string} message error message
   * @private
   */
  _addItem(path, severity, message) {
    Cop.checkPath(path)
    const pathStr = path.join(";")
    if (!this._validation.has(pathStr)) {
      this._validation.set(pathStr, [])
    }

    this._validation.get(pathStr).push({ severity, message })
  }

  /**
   * Method to add error to validation data
   * @param {import("../typedef").PropertyPath} path path of property to add validation error to
   * @param {string} message error message
   */
  addError(path, message) {
    this._addItem(path, SEVERITY_ERROR, message)
  }

  /**
   * Method to add warning to validation data
   * @param {import("../typedef").PropertyPath} path path of property to add validation error to
   * @param {string} message warning message
   */
  addWarning(path, message) {
    this._addItem(path, SEVERITY_WARNING, message)
  }

  /**
   * Checks if object is not null or undefined.
   * @param {import("../typedef").PropertyPath} path path of property to add validation error to
   * @param {object} object - Tested object
   * @param {string} message - Optional error message
   * @returns {void}
   */
  checkSet(path, object, message = undefined) {
    if (object === null || object === undefined) {
      this.addError(path, message ?? "Value is null/undefined")
    }
  }

  /**
   * Checks if object is null or undefined.
   * @param {import("../typedef").PropertyPath} path path of property to add validation error to
   * @param {object} object - Tested object
   * @param {string} message - Optional error message
   * @returns {void}
   */
  checkNotSet(path, object, message = undefined) {
    if (object !== null && object !== undefined) {
      this.addError(path, message ?? "Value should be null/undefined but it is set to value")
    }
  }

  /**
   * Checks if expression is true.
   * @param {import("../typedef").PropertyPath} path path of property to add validation error to
   * @param {any} object - Tested object
   * @param {string} message - Optional error message
   * @returns {void}
   */
  checkTrue(path, bool, message = undefined) {
    if (bool !== true) {
      this.addError(path, message || `True expected, got ${bool}`)
    }
  }

  /**
   * Checks if object is a string and is not blank.
   * @param {import("../typedef").PropertyPath} path path of property to add validation error to
   * @param {any} object - Tested object
   * @param {string} message - Optional error message
   * @returns {void}
   */
  checkNotBlank(path, object, message = undefined) {
    Cop.isA(object, String)

    if (object === null || object === undefined || object.length < 1) {
      this.addError(path, message ?? "Value should not be blank")
    }
  }

  /**
   * Checks if number is greater than other.
   * @param {import("../typedef").PropertyPath} path path of property to add validation error to
   * @param {Number} number - Tested number
   * @param {Number} ref - Expected greater number
   * @param {string} message - Optional error message
   * @returns {void}
   */
  checkGreaterThan(path, number, ref, message = undefined) {
    Cop.isA(number, Number)
    Cop.isA(ref, Number)

    if (number <= ref) {
      this.addError(path, message || `Expected positive number greather than ${ref} but got ${number}`)
    }
  }

  /**
   * Checks if number is lower than other.
   * @param {import("../typedef").PropertyPath} path path of property to add validation error to
   * @param {Number} number - Tested number
   * @param {Number} ref - Expected lower number
   * @param {string} message - Optional error message
   * @returns {void}
   */
  checkLessThan(path, number, ref, message = undefined) {
    Cop.isA(number, Number)
    Cop.isA(ref, Number)

    if (number >= ref) {
      this.addError(path, message || `Expected positive number lesser than ${ref} but got ${number}`)
    }
  }

  /**
   * Checks if two values are equal or objects has same reference.
   * @param {import("../typedef").PropertyPath} path path of property to add validation error to
   * @param {any} value - Tested value
   * @param {any} ref - Other value
   * @param {string} message - Optional error message
   * @returns {void}
   */
  checkEquals(path, value, ref, message = undefined) {
    if (value !== ref) {
      this.addError(path, message || `Expected same values but got '${value}' and '${ref}'`)
    }
  }

  /**
   * Checks if array contains value.
   * @param {import("../typedef").PropertyPath} path path of property to add validation error to
   * @param {Array} array - Tested array
   * @param {any} value - Expected value.
   * @param {string} message - Optional error message
   * @returns {void}
   */
  checkContained(path, array, value, message = undefined) {
    Cop.isA(array, Array)

    if (!array.includes(value)) {
      this.addError(path, message || `Value ${value} not found in array`)
    }
  }

  /**
   * Checks if array does not contain value.
   * @param {import("../typedef").PropertyPath} path path of property to add validation error to
   * @param {Array} array - Tested array
   * @param {any} value - Expected value.
   * @param {string} message - Optional error message
   * @returns {void}
   */
  checkNotContained(path, array, value, message = undefined) {
    Cop.isA(array, Array)

    if (array.includes(value)) {
      this.addError(path, message || `Value ${value} is already in array`)
    }
  }
}
