import { Store } from "../store/Store"
import { createIdsSeq } from "../utils/ObjectUtils"
import Validator from "../utils/Validator"

export class Database {
  constructor(data) {
    /**
     * @type {Store}
     * @private
     */
    this._store = new Store(data)

    /**
     * @type {Map<string, Generator>}
     * @private
     */
    this._idSequences = new Map()
  }

  /**
   * Method to initialize new id sequence.
   * @param {string} name name of id sequence
   * @returns {Generator}
   */
  initializeIdSequence(name) {
    Validator.notContained(this._idSequences, name)
    this._idSequences.set(name, createIdsSeq())
  }

  /**
   * Method to get next available id for specific sequence.
   * @param {string} name name of id sequence
   * @returns {number}
   */
  getNextId(name) {
    Validator.contained(this._idSequences, name)
    return this._idSequences.get(name).next()
  }

  /**
   * Method to get property value.
   * @param {import("../typedef").PropertyPath} path
   */
  getValue(path) {
    return this._store.getValue(path)
  }

  /**
   * Method to set property value.
   * @param {import("../typedef").PropertyPath} path
   * @param {any} value
   */
  setValue(path, value) {
    this._store.setValue(path, value)
  }

  transaction(runnable) {
    const data = this._store.getData()
    try {
      runnable()
    } catch (e) {
      this._rollback(data)
      throw e
    }
  }

  _rollback(data) {
    this._store = new Store(data)
  }
}

const database = new Database({ users: [] })
database.initializeIdSequence("users")

export default database
