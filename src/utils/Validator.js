/**
 * @class Utility class with validation functions
 */
export default class Validator {
  /**
   * Assures that path entries are valid.
   * @param {import("../typedef").PropertyPath} path - Tested path
   * @returns {void}
   */
  static checkPath(path) {
    Validator.nonEmptyArray(path)
    path.forEach((key) => Validator.isOneOfType(key, new Set([Number, String])))
  }

  /**
   * Assures that object is not null or undefined.
   * @param {object} object - Tested object
   * @param {string} message - Optional error message
   * @returns {void}
   */
  static isSet(object, message = undefined) {
    if (object === null || object === undefined) {
      throw new Error(message || "Object is null/undefined")
    }
  }

  /**
   * Assures that object is null or undefined.
   * @param {object} object - Tested object
   * @param {string} message - Optional error message
   * @returns {void}
   */
  static isNotSet(object, message = undefined) {
    if (object !== null && object !== undefined) {
      throw new Error(
        message || "Object should be null/undefined but it is set to value"
      )
    }
  }

  /**
   * Assures that expression is true.
   * @param {any} object - Tested object
   * @param {string} message - Optional error message
   * @returns {void}
   */
  static isTrue(bool, message = undefined) {
    if (bool !== true) {
      throw new Error(message || `True expected, got ${bool}`)
    }
  }

  /**
   * Assures that object is a string and is not blank.
   * @param {any} object - Tested object
   * @param {string} message - Optional error message
   * @returns {void}
   */
  static notBlank(object, message = undefined) {
    this.isA(object, String)

    if (object === null || object === undefined || object.length < 1) {
      throw new Error(message || "String should not be blank")
    }
  }

  /**
   * Assures that object is of specific type.
   * @param {any} object - Tested object
   * @param {Set} klasse - Expected type
   * @param {string} message - Optional error message
   * @returns {void}
   */
  static isA(object, klass, message = undefined) {
    Validator.isOneOfType(object, new Set([klass]), message)
  }

  /**
   * Assures that object is one of types.
   * @param {any} object - Tested object
   * @param {Set} klasses - Expected types
   * @param {string} message - Optional error message
   * @returns {void}
   */
  static isOneOfType(object, klasses, message = undefined) {
    this.isSet(object)
    this.isSet(klasses)

    if (!object.constructor in klasses) {
      throw new Error(
        message ||
          `Expected object is one of types [${Array.from(
            klasses.values()
          )}] but got ${object.constructor.name}`
      )
    }
  }

  /**
   * Assures that a function has exact count of arguments.
   * @param {Function} func - Tested function
   * @param {Number} arity - Expected count arguments
   * @param {string} message - Optional error message
   * @returns {void}
   */
  static isFunctionWithArity(func, arity, message = undefined) {
    if (typeof func !== "function") {
      throw new Error(`Expected function but got ${typeof func}`)
    }

    if (func.length !== arity) {
      throw new Error(
        message ||
          `Expected function with arity ${arity} but got ${func.length}`
      )
    }
  }

  /**
   * Assures that count of function arguments is in range.
   * @param {Function} func - Tested function
   * @param {Number} arityMin - Min expected count of expected arguments
   * @param {Number} arityMax - Max expected count of expected arguments
   * @param {string} message - Optional error message
   * @returns {void}
   */
  static isFunctionWithArityBetween(
    func,
    arityMin,
    arityMax,
    message = undefined
  ) {
    if (typeof func !== "function") {
      throw new Error(`Expected function but got ${typeof func}`)
    }

    if (func.length < arityMin || func.length > arityMax) {
      throw new Error(
        message ||
          `Expected function with arity between ${arityMin} and ${arityMax} but got ${func.length}`
      )
    }
  }

  /**
   * Assures that array has exact length.
   * @param {Array} array - Tested array
   * @param {Number} length - Expected length
   * @param {string} message - Optional error message
   * @returns {void}
   */
  static arrayOfSize(array, length, message = undefined) {
    this.isA(array, Array)

    if (array.length !== length) {
      throw new Error(
        message ||
          `Expected array with length ${length} but got ${array.length}`
      )
    }
  }

  /**
   * Assures that string has exact length.
   * @param {String} str - Tested string
   * @param {Number} length - Expected length
   * @param {string} message - Optional error message
   * @returns {void}
   */
  static stringOfSize(str, length, message = undefined) {
    this.isA(str, String)

    if (str.length !== length) {
      throw new Error(
        message || `Expected string with length ${length} but got ${str.length}`
      )
    }
  }

  /**
   * Assures that number is greater than other.
   * @param {Number} number - Tested number
   * @param {Number} ref - Expected greater number
   * @param {string} message - Optional error message
   * @returns {void}
   */
  static greaterThan(number, ref, message = undefined) {
    this.isA(number, Number)
    this.isA(ref, Number)

    if (number <= ref) {
      throw new Error(
        message ||
          `Expected positive number greather than ${ref} but got ${number}`
      )
    }
  }

  /**
   * Assures that number is lower than other.
   * @param {Number} number - Tested number
   * @param {Number} ref - Expected lower number
   * @param {string} message - Optional error message
   * @returns {void}
   */
  static lessThan(number, ref, message = undefined) {
    this.isA(number, Number)
    this.isA(ref, Number)

    if (number >= ref) {
      throw new Error(
        message ||
          `Expected positive number lesser than ${ref} but got ${number}`
      )
    }
  }

  /**
   * Assures that number is positive.
   * @param {Number} number - Tested number
   * @param {string} message - Optional error message
   * @returns {void}
   */
  static positiveNumber(number, message = undefined) {
    this.isA(number, Number)

    if (number < 0) {
      throw new Error(message || `Expected positive number but got ${number}`)
    }
  }

  /**
   * Assures that two values are equal or objects has same reference.
   * @param {any} value - Tested value
   * @param {any} ref - Other value
   * @param {string} message - Optional error message
   * @returns {void}
   */
  static equals(value, ref, message = undefined) {
    if (value !== ref) {
      throw new Error(
        message || `Expected same values but got '${value}' and '${ref}'`
      )
    }
  }

  /**
   * Assures that array is not empty.
   * @param {Array} array - Tested array
   * @param {string} message - Optional error message
   * @returns {void}
   */
  static nonEmptyArray(array, message = undefined) {
    this.isA(array, Array)

    if (array.length <= 0) {
      throw new Error(message || `Expected non empty array but got empty`)
    }
  }

  /**
   * Assures that array contains only strings.
   * @param {Array} array - Tested array
   * @param {string} message - Optional error message
   * @returns {void}
   */
  static arrayOfStrings(array, message = undefined) {
    this.isA(array, Array)

    array.forEach((item, index) => {
      if (item === null || item === undefined) {
        throw new Error(
          message ||
            `Found null/undefined item on index ${index} in array [${array.join(
              ", "
            )}]`
        )
      }

      if (item.constructor !== String) {
        throw new Error(
          message ||
            `Expected string but got ${
              object.constructor.name
            } on index ${index} in array [${array.join(", ")}]`
        )
      }
    })
  }

  /**
   * Assures that value is one of specified.
   * @param {any} value - Tested value
   * @param {Array} options - Expected possible values
   * @param {string} message - Optional error message
   * @returns {void}
   */
  static oneOf(value, options, message = undefined) {
    this.isA(options, Array)

    if (options.indexOf(value) == -1) {
      throw new Error(
        message ||
          `Value '${value}' is not among allowed values ${options.join(", ")}`
      )
    }
  }

  /**
   * Assures that object has a key.
   * @param {Map} map - Tested object
   * @param {object} key - Expected key to be found.
   * @param {string} message - Optional error message
   * @returns {void}
   */
  static contained(map, key, message = undefined) {
    if (!map.has(key)) {
      throw new Error(message || `Key '${key}' not found in map`)
    }
  }

  /**
   * Assures that object does not have a key.
   * @param {object} map - Tested object
   * @param {object} key - Expected key that should not be found.
   * @param {string} message - Optional error message
   * @returns {void}
   */
  static notContained(map, key, message = undefined) {
    if (key in map) {
      throw new Error(message || `Object ${key} is already in map`)
    }
  }

  /**
   * Assures that array includes value.
   * @param {Array} array - Tested array
   * @param {any} value - Expected value.
   * @param {string} message - Optional error message
   * @returns {void}
   */
  static included(array, value, message = undefined) {
    this.isA(array, Array)

    if (!array.includes(value)) {
      throw new Error(message || `Value ${value} not found in array`)
    }
  }

  /**
   * Assures that array does not include value.
   * @param {Array} array - Tested array
   * @param {any} value - Expected value.
   * @param {string} message - Optional error message
   * @returns {void}
   */
  static notIncluded(array, value, message = undefined) {
    this.isA(array, Array)

    if (array.includes(value)) {
      throw new Error(message || `Value ${value} is already in array`)
    }
  }

  /**
   * Assures that string matches regex.
   * @param {string} str - Tested string
   * @param {RegExp} regexp - Expected pattern to match.
   * @param {string} message - Optional error message
   * @returns {void}
   */
  static regexp(str, regexp, message = undefined) {
    this.isA(str, String)
    this.isA(regexp, RegExp)

    if (!regexp.test(str)) {
      throw new Error(
        message || `String "${str}" does not match pattern "${regexp}"`
      )
    }
  }
}
