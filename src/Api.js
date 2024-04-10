import { IdParam, UserData, UsersFilter, UsersList } from "./ApiDef"
import Validator from "./utils/Validator"
import { Store } from "./store/Store"
import { createIdsSeq } from "./utils/ObjectUtils"

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
      impl,
    })
  }

  /**
   * Method for making api requests.
   * @param {object} data - Data sent to API.
   * @param {object} structDef - Required object arguments by API.
   */
  _checkInput(inputData, structDef) {
    const missing = new Set()
    const inputDataKeys = Object.keys(inputData)
    const defKeys = Object.keys(structDef)

    inputDataKeys.forEach((key) => {
      if (!defKeys.includes(key)) {
        throw `Received uknown property '${key}'`
      }
    })

    defKeys.forEach((key) => {
      if (
        !key.startsWith("_") &&
        structDef[key] &&
        !inputDataKeys.includes(key)
      ) {
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

  /**
   * Method for making api requests.
   * @param {string} apiMethod - Name of API method to call.
   * @param {object} inputData - Data used as input for called API method.
   * @param {function} callback - Method to execute when API request is finished with API response as parameter.
   */
  execute(method, inputData, callback) {
    Validator.isSet(method)
    Validator.contained(this._methods, method)
    Validator.isSet(inputData)
    Validator.isSet(callback)

    const apiMethod = this._methods.get(method)
    //   this._checkInput(inputData, method.enpoint.inputType)

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const result = apiMethod.impl(inputData)
        resolve(result)
      }, 1500)
    }).then(callback)
  }
}

export class Endpoint {
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

const API = new Api()

const usersIdSeq = createIdsSeq()
const database = new Store({
  users: [],
})

API.register(new Endpoint("user/get", IdParam, UserData), (id) => {
  const user = database.getValue(["users"]).find((user) => user.id == id)
  if (!user) {
    throw `User with id ${inputData.id} does not exist.`
  }

  return { data: user }
})

API.register(new Endpoint("user/upsert", UserData, IdParam), (data) => {
  const user = structuredClone(data)

  if (!user.id) {
    user.id = usersIdSeq.next()
  }

  const users = database.getValue(["users"])
  users.push(user)

  database.setValue(["users"], users)
  return { id: user.id }
})

API.register(new Endpoint("users/list", UsersFilter, UsersList), (filter) => {
  return database
    .getValue(["users"])
    .filter(
      (user) =>
        !filter.fulltext ||
        `${user.name} ${user.surname}`.includes(filter.fulltext)
    )
})

/**
 * Method for making api requests.
 * @param {string} apiMethod - Name of API method to call.
 * @param {object} inputData - Data used as input for called API method.
 * @param {function} callback - Method to execute when API request is finished with API response as parameter.
 */
function apiExec(method, inputData, callback) {
  API.execute(method, inputData, callback)
}

export default apiExec
