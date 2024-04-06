import Validator from "./Validator"

/**
 * Function to get property or value from object by path.
 * @param {import("../typedef").PropertyPath} path
 * @param {object} data
 */
export function getAtPath(path, data) {
    Validator.checkPath(path)

    return path.reduce((dataObject, currentKey) => {
        if (canContinueAtPath(dataObject, currentKey)) {
            return dataObject[currentKey]
        }

        return dataObject
    }, data)
}

/**
 * Function assuring that object is valid and object contains property
 * @param {(string|number)} propertyKey
 * @param {object} dataObject
 */
export function canContinueAtPath(dataObject, propertyKey) {
    return typeof dataObject === 'object' && dataObject !== null && propertyKey in dataObject
}