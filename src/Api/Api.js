import { IdParam, UserData, UsersFilter, UsersList } from "./ApiDef"
import Validator from "../utils/Validator"
import Endpoint from "./Endpoint"
import database from "./Database"

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
    const apiMethod = this._methods.get(method)
    this._validateStructDef(inputData, apiMethod.endpoint.inputType)
    const [validate, exec] = apiMethod.impl(inputData)

    return this._run(method, inputData, (resolve, reject) => {
      const errors = validate()
      if (errors.length > 0) {
        reject(errors)
      } else {
        database.transaction(() => {
          const result = exec()
          this._validateStructDef(result, apiMethod.endpoint.outputType)
          resolve(result)
        })
      }
    })
  }

  /**
   * Method for making api requests.
   * @param {string} apiMethod - Name of API method to call.
   * @param {object} inputData - Data used as input for called API method.
   */
  validate(method, inputData) {
    const [validate, _] = apiMethod.impl(inputData)

    return this._run(method, inputData, resolve => {
      const errors = validate()
      resolve(errors)
    })
  }

  /**
   * @param {string} apiMethod - Name of API method to call.
   * @param {object} inputData - Data used as input for called API method.
   * @param {function(resolve:function, reject:function)} promiseHandler - Data used as input for called API method.
   */
  _run(method, inputData, promiseHandler) {
    Validator.isSet(method)
    Validator.contained(this._methods, method)
    Validator.isSet(inputData)

    const apiMethod = this._methods.get(method)
    this._validateStructDef(inputData, apiMethod.endpoint.inputType)

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        promiseHandler(resolve, reject)
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

    Validator.arrayOfSize(
      missingArray,
      0,
      `Could not deserialize class ${structDef.className} because some of required properties are not set [${missingArray}].`
    )
  }
}

const api = new Api()

api.register(new Endpoint("user/get", IdParam, UserData), data => {
  function validate() {
    return []
  }
  function execute() {
    const user = database.getValue(["users"]).find(user => user.id == data.id)
    if (!user) {
      throw `User with id ${data.id} does not exist.`
    }

    return user
  }

  return [validate, execute]
})

api.register(new Endpoint("user/upsert", UserData, IdParam), data => {
  function validate() {
    const errors = []
    if (!data.name) {
      errors.push("Field name cannot be blank.")
    }

    if (!data.surname) {
      errors.push("Field surname cannot be blank.")
    }
    return errors
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
  function validate() {
    return []
  }
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
