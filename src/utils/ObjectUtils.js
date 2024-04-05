import { Validator } from "./Validator"

/**
 * Method to get value from object property.
 * @param {ObjectPath} path
 * @param {object} data
 */
export function getPropertyValueByPath(path, data) {
    Validator.checkPath(path)

    return path.reduce((dataObject, currentKey) => {
        if (canContinueAtPath(dataObject, currentKey)) {
            return dataObject[currentKey]
        }

        return dataObject
    }, data)
}

/**
 * Method to check if object is valid and object contains property
 * @param {(string|number)} propertyKey
 * @param {object} dataObject
 */
export function canContinueAtPath(dataObject, propertyKey) {
    return typeof dataObject === 'object' && dataObject !== null && propertyKey in dataObject
}