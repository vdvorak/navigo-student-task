import Cop from "./Cop"

/**
 * Generator for id sequences
 * @returns {number}
 */
export function* createIdsSeq() {
  let id = 1
  while (true) {
    yield id++
  }
}

/**
 * Function to get object property value by path.
 * @param {import("../typedef").PropertyPath} path
 * @param {object} data
 */
export function getPropertyValue(path, data) {
  Cop.checkPath(path)

  return path.reduce((dataObject, currentKey) => {
    if (canContinueAtPath(dataObject, currentKey)) {
      return dataObject[currentKey]
    }

    return dataObject
  }, data)
}

/**
 * Function to set object property value by path.
 * @param {import("../typedef").PropertyPath} path
 * @param {any} value
 * @param {object} data
 */
export function setPropertyValue(path, value, data) {
  Cop.checkPath(path)
  const propertyName = path.at(-1)
  let entry = data

  if (path.length > 1) {
    const entryPath = path.slice(0, path.length - 1)
    entry = getPropertyValue(entryPath, data)
  }

  const prevValue = structuredClone(entry[propertyName])

  if (!isEqual(value, prevValue)) {
    entry[propertyName] = value
  }
}

/**
 * Function assuring that object is valid and object contains property
 * @param {(string|number)} propertyKey
 * @param {object} dataObject
 */
export function canContinueAtPath(dataObject, propertyKey) {
  return typeof dataObject === "object" && dataObject !== null && propertyKey in dataObject
}

/**
 * Function to check if two values are equal.
 * @param {any} value1
 * * @param {any} value2
 */
export function isEqual(value1, value2) {
  if (typeof dataObject === "object") {
    return JSON.stringify(value1) === JSON.stringify(value2)
  }

  return value1 === value2
}
