/**
 * Class for working with API
 */
class Store {
    /**
     * Method to load data using API
     * @returns {undefined}
     */
    load() {
      throw 'Not implemented!'
    }
  
    /**
     * Method to get value by path.
     * @param {(string|number)[]} path - path to data.
     * @returns {any}
     */
    getValue(path) {
      throw 'Not implemented!'
    }
  
    /**
     * Method to set value on path.
     * @param {(string|number)[]} path - path to data.
     */
    setValue(path) {
      throw 'Not implemented!'
    }
  
    /**
     * Method to check if value on path has been changed.
     * @param {(string|number)[]} path - path to data.
     * @returns {boolean}
     */
    isChanged(path) {
      throw 'Not implemented!'
    }
  
    /**
     * Method to check if store contains any change.
     * @returns {boolean}
     */
    isDirty() {
      throw 'Not implemented!'
    }
  }
  