/**
 * @typedef {Object} Data
 * @property {string} defaultBranch
 * @property {Object[]} actions
 */

class ParseData {
  /**
   * @param {Data} data
   */
  constructor(data) {
    /**
     * @type {ParseData}
     * @private
     */
    this._data = data;
  }

  /**
   * @returns {ParseData}
   */
  dump() {
    return this._data;
  }

  /**
   * @returns {string}
   */
  getDefaultBranch() {
    return this._data.defaultBranch;
  }

  /**
   * @returns {Object[]}
   */
  getActions() {
    return this._data.actions;
  }
}

module.exports = ParseData;
