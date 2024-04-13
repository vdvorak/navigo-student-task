import { IdParam, UserData, UsersFilter, UsersList } from "./ApiDef"
import Endpoint from "./Endpoint"
import database from "./Database"
import { SEVERITY_ERROR, Validator } from "./Validator"
import Cop from "../utils/Cop"

class Api {
  _methods = new Map()

  /**
   *
   * @param {Endpoint} endpoint
   * @param {function(endpoint.inputType): endpoint.outputType} impl
   */
  register(endpoint, impl) {
    this._methods.set(endpoint.method, {
      endpoint,
      impl
    })
  }

  /**
   * Method for making api requests.
   * @param {string} apiMethod - Name of API method to call.
   * @param {object} inputData - Data used as input for called API method.
   */
  execute(method, inputData) {
    Cop.isSet(method)
    Cop.isSet(inputData)
    Cop.contained(this._methods, method)

    const apiMethod = this._methods.get(method)
    this._validateStructDef(inputData, apiMethod.endpoint.inputType)
    const [validate, execute] = apiMethod.impl(inputData)
    const validator = new Validator()
    validate(validator)
    const validationData = validator.getValidationData()

    return this._run((resolve, reject) => {
      const hasAnyValidationError = [] // validationData.values.flat().filter(validation => validation.severity === SEVERITY_ERROR).length > 0

      if (hasAnyValidationError) {
        reject({ output: null, validation: validationData })
      } else {
        const result = execute(inputData)
        this._validateStructDef(result, apiMethod.endpoint.outputType)
        resolve({ output: result, validation: validationData })
      }
    })
  }

  /**
   * @param {string} apiMethod - Name of API method to call.
   * @param {object} inputData - Data used as input for called API method.
   * @param {function(resolve:function, reject:function)} promiseHandler - Data used as input for called API method.
   */
  _run(promiseHandler) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        database.transaction(() => {
          promiseHandler(resolve, reject)
        })
      }, 300)
    })
  }

  /**
   * Method for making api requests.
   * @param {object} data - Data sent to API.
   * @param {object} structDef - Required object arguments by API.
   */
  _validateStructDef(data, structDef) {
    const missing = new Set()
    const dataKeys = Object.keys(data)

    dataKeys.forEach(key => {
      if (!Object.keys(structDef.props).includes(key)) {
        throw `Received uknown property '${key}'`
      }
    })

    Object.entries(structDef.props).forEach(([key, prop]) => {
      if (!prop.optional && !dataKeys.includes(key)) {
        missing.add(key)
      }
    })

    const missingArray = Array.from(missing)

    Cop.arrayOfSize(
      missingArray,
      0,
      `Could not deserialize class ${structDef.className} because some of required properties are not set [${missingArray}].`
    )
  }
}

const api = new Api()

api.register(new Endpoint("user/get", IdParam, UserData), data => {
  let user
  function validate(/** @type {Validator} */ validator) {
    user = database.getValue(["users"]).find(user => user.id == data.id)
    validator.checkSet(user, `User with id ${data.id} does not exist.`)
  }
  function execute() {
    return user
  }

  return [validate, execute]
})

api.register(new Endpoint("user/upsert", UserData, IdParam), data => {
  function validate(/** @type {Validator} */ validator) {
    validator.checkNotBlank(["name"], data.name)
    validator.checkNotBlank(["surname"], data.surname)
  }

  function execute() {
    const user = structuredClone(data)

    if (!user.id) {
      user.id = database.getNextId("users")
    }

    const users = database.getValue(["users"])
    users.push(user)

    database.setValue(["users"], users)

    return { id: user.id }
  }

  return [validate, execute]
})

api.register(new Endpoint("users/list", UsersFilter, UsersList), filter => {
  function validate(/** @type {Validator} */ validator) {}
  function execute() {
    return {
      items: database
        .getValue(["users"])
        .filter(user => !filter.fulltext || `${user.name} ${user.surname}`.includes(filter.fulltext))
    }
  }

  return [validate, execute]
})

/**
 * Method for making api requests.
 * @param {string} apiMethod - Name of API method to call.
 * @param {object} inputData - Data used as input for called API method.
 */
function apiExec(method, inputData, callback) {
  return api.execute(method, inputData).then(callback)
}

export default apiExec
