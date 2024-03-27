import { idParam, userData, usersFilter } from './ApiStructures'
import { Validator } from './Validator'

export class Api {
  _users = new Map()
  _lastUserId = 1

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
        throw `Received uknown argument '${key}'`
      }
    })

    defKeys.forEach((key) => {
      if (
        !key.startsWith('_') &&
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
      `Could not deserialize class ${structDef.className} because some of required attributes are not set [${missingArray}].`
    )
  }

  /**
   * Method for making api requests.
   * @param {("user/get"|"user/upsert")} apiMethod - Name of API method to call.
   * @param {object} inputData - Data used as input for called API method.
   * @param {function} callback - Method to execute when API request is finished with API response as parameter.
   */
  execute(method, inputData, callback) {
    Validator.isSet(method)
    Validator.isSet(inputData)
    Validator.isSet(callback)
    return new Promise(() => {
      setTimeout(() => {
        switch (method) {
          case 'user/get':
            this._checkInput(inputData, idParam)
            if (!this._users.has(inputData.id)) {
              throw `User with id ${inputData.id} does not exist.`
            }
            callback(this._users.get(inputData.id))
            break

          case 'users/list':
            throw 'Not implemented'

          case 'user/upsert':
            this._checkInput(inputData, userData)
            let id
            if (inputData.id) {
              id = inputData.id
            } else {
              id = ++this._lastUserId
            }
            this._users.set(id, inputData)
            callback(id)
            break

          default:
            throw `Uknown API method '${apiMehod}'.`
        }
      }, 300)
    })
  }
}
